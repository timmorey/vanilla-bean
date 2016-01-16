import Ember from 'ember';

const Recipe = Ember.Object.extend({

  toJson() {

  },

  isEqual(recipe) {
    return false;
  },

  copy() {
    return Recipe.create(this.toJson());
  }

});

export default Recipe;
