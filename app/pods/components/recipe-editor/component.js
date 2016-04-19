import Ember from 'ember';
import Recipe from 'vanilla-bean/pods/recipe/model';

const {
  computed,
  get,
  set,
  Component
} = Ember;

export default Component.extend({

  classNames: ['recipe-editor'],

  recipeJson: null,

  recipe: computed('recipeJson', function() {
    try {
      return set(this, '_lastValidRecipe', Recipe.create(JSON.parse(this.get('recipeJson'))));
    } catch (err) {
      return get(this, '_lastValidRecipe');
    }
  }),

  _lastValidRecipe: null,

});
