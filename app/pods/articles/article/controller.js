import Ember from 'ember';

const {
  computed,
  inject
} = Ember;

export default Ember.Controller.extend({

  appController: inject.controller('application'),

  isEditing: computed('appController.currentRouteName', function() {
    return this.get('appController.currentRouteName').startsWith('articles.article.edit');
  })

});
