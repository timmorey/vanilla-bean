import Ember from 'ember';
import Article from '../article/model';
import ImageReference from '../image-reference/model';
import ParseArticle from '../article/parse/model';
import ParseImageReference from '../image-reference/parse/model';
import ENV from '../../config/environment';

const {
  RSVP: {
    hash,
    map,
    Promise
  }
} = Ember;

export default Ember.Service.extend({

  init() {
    Parse.initialize(ENV.APP.parseApplicationId, ENV.APP.parseJavascriptApiKey);
    this._super.apply(this, arguments);
  },

  fetchArticle(id) {
    return hash({
      article: new Promise((resolve, reject) => {
        const articleQuery = new Parse.Query(ParseArticle);
        articleQuery.get(id)
          .then(parseArticle => {
            const article = Article.create();
            article.fromParseArticle(parseArticle);
            return article;
          })
          .then(resolve, reject);
      }),
      images: this.fetchImagesForObject(id)
    }).then((responses) => {
      responses.article.set('images', responses.images);
      return responses.article;
    });
  },

  fetchAllArticles() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(ParseArticle);
      return query.find()
        .then(results => results.map((parseArticle) => {
          const article = Article.create();
          article.fromParseArticle(parseArticle);
          return article;
        }))
        .then(resolve, reject);
      })
      .then(articles => map(articles, (article) => {
        return hash({
          article: article,
          images: this.fetchImagesForObject(article.get('id'))
        });
      }))
      .then(responses => map(responses, (response) => {
        response.article.set('images', response.images);
        return response.article;
      }));
  },

  queryArticles(where) {
    return this.fetchAllArticles()
      .then((articles) => articles.filter((article) => {
        if (article.get('title').toLowerCase().indexOf(where.toLowerCase()) !== -1) {
          return true;
        }

        return false;
      }));
  },

  fetchImagesForObject(id) {
    return new Promise((resolve, reject) => {
      const imageReferenceQuery = new Parse.Query(ParseImageReference);
      imageReferenceQuery.equalTo('ownerId', id);
      imageReferenceQuery.find()
        .then(parseImageReferences => {
          return parseImageReferences.map((parseImageReference) => {
            const imageReference = ImageReference.create();
            imageReference.fromParseObject(parseImageReference);
            return imageReference;
          });
      })
      .then(resolve, reject);
    });
  },

  saveArticle(article) {
    return new Promise((resolve, reject) => {
      const parseArticle = article.toParseArticle();
      parseArticle.save()
        .then(() => article.fromParseArticle(parseArticle))
        .then(resolve, reject);
    })
    .then(() => map(article.get('images') || [], (imageReference) => this.saveImageReference(imageReference)));
  },

  saveImageReference(imageReference) {
    return new Promise((resolve, reject) => {
      const parseImageReference = imageReference.toParseObject();
      parseImageReference.save()
        .then(() => imageReference.fromParseObject(parseImageReference))
        .then(resolve, reject);
    });
  },

  addImage(file) {
    return new Promise((resolve, reject) => {
      const parseFile = new Parse.File(file.name, file);
      // TODO: not sure why the promise style doesn't work, but it seems that
      // the promise resolves before the save operation is complete
      // parseFile.save().then(resolve(parseFile), reject);
      parseFile.save({
        success: () => {
          resolve(parseFile);
        },
        error: reject
      });
    });
  },

  revertArticle(article) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(ParseArticle);
      return query.get(article.get('id'))
        .then(parseArticle => {
          article.fromParseArticle(parseArticle);
          return article;
        })
        .then(resolve, reject);
    })
    .then(() => this.fetchImagesForObject(article.get('id')))
    .then((images) => {
      article.set('images', images);
      return article;
    });
  },

  removeImageReference(imageReference) {
    imageReference.toParseObject().destroy();
  }

});
