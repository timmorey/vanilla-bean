import Ember from 'ember';
import Recipe from 'vanilla-bean/pods/recipe/model';

const { computed } = Ember;

export default Ember.Component.extend({

  classNames: ['article-viewer'],

  article: null,

  title: computed.alias('article.title'),
  story: computed.alias('article.story'),
  recipe: computed('article.recipeJson', function() {
    try {
      return Recipe.create(JSON.parse(this.get('article.recipeJson')));
    } catch (err) {
      return null;
    }
  }),

});
