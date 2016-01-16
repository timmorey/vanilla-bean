import Ember from 'ember';
import Recipe from 'vanilla-bean/pods/recipe/model';

const {
  computed
} = Ember;

export default Ember.Object.extend({

  article: null,
  backupArticle: null,

  hasMadeChanges: computed(
    'article.title',
    'article.abstract',
    'article.story',
    'article.recipeJson',
    'article.thumbnailUrl',
    'article.images.[]',
    function() {
      return !this.get('article').isEqual(this.get('backupArticle'));
  }),

  recipe: computed('article.recipeJson', function() {
    return Recipe.create(JSON.parse(this.get('article.recipeJson')));
  }),

  init() {
    this.set('backupArticle', this.get('article').copy());
  },

});
