import Ember from 'ember';
import Recipe from 'vanilla-bean/pods/recipe/model';

const {
  computed,
  Component
} = Ember;

export default Component.extend({

  classNames: ['recipe-editor'],

  recipeJson: null,

  recipe: computed('recipeJson', function() {
    try {
      return Recipe.create(JSON.parse(this.get('recipeJson')));
    } catch (err) {
      return null;
    }
  }),

});
