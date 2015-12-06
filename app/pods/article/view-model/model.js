import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Object.extend({

  article: null,
  backupArticle: null,

  hasMadeChanges: computed(
    'article.title',
    'article.abstract',
    'article.content',
    'article.thumbnailUrl',
    'article.images.[]',
    function() {
      return !this.get('article').isEqual(this.get('backupArticle'));
  }),

  init() {
    this.set('backupArticle', this.get('article').copy());
  },

});
