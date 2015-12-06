import Ember from 'ember';
import ParseArticle from './parse/model';

const Article = Ember.Object.extend({

  id: '',
  title: '',
  abstract: '',
  content: '',
  thumbnailUrl: null,
  createdDate: null,
  updatedDate: null,

  images: null,

  fromParseArticle(parseArticle) {
    this.set('id', parseArticle.id);
    this.set('title', parseArticle.get('title'));
    this.set('abstract', parseArticle.get('abstract'));
    this.set('content', parseArticle.get('content'));
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
    parseArticle.set('content', this.get('content'));
    parseArticle.set('thumbnailUrl', this.get('thumbnailUrl'));
    return parseArticle;
  },

  isEqual(article) {
    if (this.get('id') !== article.get('id') ||
      this.get('title') !== article.get('title') ||
      this.get('abstract') !== article.get('abstract') ||
      this.get('content') !== article.get('content') ||
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
      content: this.get('content'),
      thumbnailUrl: this.get('thumbnailUrl'),
      images: (this.get('images') || []).map(imageReference => imageReference.copy()),
      createdDate: this.get('createdDate'),
      updatedDate: this.get('updatedDate')
    });
  }

});

export default Article;