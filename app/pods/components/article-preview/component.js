import Ember from 'ember';

const {
  computed,
  Component
} = Ember;

export default Component.extend({

  classNames: ['article-preview'],

  article: null,

  title: computed.alias('article.title'),
  abstract: computed.alias('article.abstract'),
  thumbnailUrl: computed('article.thumbnailUrl', function() {
    return this.get('article.thumbnailUrl') || 'default-thumbnail.jpg';
  })

});
