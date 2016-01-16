import Ember from 'ember';
import ParseArticle from './parse/model';

const Article = Ember.Object.extend({

  id: '',
  title: '',
  abstract: '',
  story: '',
  recipeJson: '',
  thumbnailUrl: null,
  createdDate: null,
  updatedDate: null,

  images: null,

  init() {
    if (this.images === null) {
      this.set('images', []);
    }
  },

  fromParseArticle(parseArticle) {
    this.set('id', parseArticle.id);
    this.set('title', parseArticle.get('title'));
    this.set('abstract', parseArticle.get('abstract'));
    this.set('story', parseArticle.get('story'));
    this.set('recipeJson', parseArticle.get('recipeJson'));
    this.set('thumbnailUrl', parseArticle.get('thumbnailUrl'));
    this.set('createdDate', parseArticle.get('createdAt'));
    this.set('updatedDate', parseArticle.get('updatedAt'));
  },

  toParseArticle() {
    const parseArticle = new ParseArticle();
    if (this.get('id')) {
      parseArticle.id = this.get('id');
    }

    parseArticle.set('title', this.get('title'));
    parseArticle.set('abstract', this.get('abstract'));
    parseArticle.set('story', this.get('story'));
    parseArticle.set('recipeJson', this.get('recipeJson'));
    parseArticle.set('thumbnailUrl', this.get('thumbnailUrl'));
    return parseArticle;
  },

  isEqual(article) {
    if (this.get('id') !== article.get('id') ||
      this.get('title') !== article.get('title') ||
      this.get('abstract') !== article.get('abstract') ||
      this.get('story') !== article.get('story') ||
      this.get('recipeJson') !== article.get('recipeJson') ||
      this.get('thumbnailUrl') !== article.get('thumbnailUrl') ||
      this.get('images.length') !== article.get('images.length')) {
      return false;
    }

    for (let i = 0; i < this.get('images.length'); i++) {
      if (!this.get('images')[i].isEqual(article.get('images')[i])) {
        return false;
      }
    }

    return true;
  },

  copy() {
    return Article.create({
      id: this.get('id'),
      title: this.get('title'),
      abstract: this.get('abstract'),
      story: this.get('story'),
      recipeJson: this.get('recipeJson'),
      thumbnailUrl: this.get('thumbnailUrl'),
      images: (this.get('images') || []).map(imageReference => imageReference.copy()),
      createdDate: this.get('createdDate'),
      updatedDate: this.get('updatedDate')
    });
  }

});

export default Article;