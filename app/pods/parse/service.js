import Ember from 'ember';
import Article from '../article/model';
import ParseArticle from '../article/parse/model';
import ENV from '../../config/environment';

const {
  RSVP: {
    Promise
  }
} = Ember;

export default Ember.Service.extend({

  init() {
    Parse.initialize(ENV.APP.parseApplicationId, ENV.APP.parseJavascriptApiKey);
    this._super.apply(this, arguments);
  },

  fetchArticle(id) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(ParseArticle);
      return query.get(id)
        .then(parseArticle => {
          const article = Article.create();
          article.fromParseArticle(parseArticle);
          return article;
        })
        .then(resolve, reject);
    });
  },

  fetchAllArticles() {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(ParseArticle);
      return query.find()
        .then(results => {
          return results.map(parseArticle => {
            const article = Article.create();
            article.fromParseArticle(parseArticle);
            return article;
          });
        })
        .then(resolve, reject);
    });
  },

  updateArticle(article) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(ParseArticle);
      return query.get(article.get('id'))
        .then(parseArticle => {
          article.fromParseArticle(parseArticle);
          return article;
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
    });
  }

});
