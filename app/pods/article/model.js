import Ember from 'ember';
import ParseArticle from './parse/model';

export default Ember.Object.extend({

  id: '',
  title: '',
  content: '',

  fromParseArticle(parseArticle) {
    this.set('id', parseArticle.id);
    this.set('title', parseArticle.get('title'));
    this.set('content', parseArticle.get('content'));
  },

  toParseArticle() {
    const parseArticle = new ParseArticle();
    if (this.get('id')) {
      parseArticle.id = this.get('id');
    }

    parseArticle.set('title', this.get('title'));
    parseArticle.set('content', this.get('content'));
    return parseArticle;
  }

});
