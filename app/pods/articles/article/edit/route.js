import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  actions: {

    save() {
      this.get('parse').saveArticle(this.get('controller.model'));
    },

    discardChanges() {
      this.get('parse').updateArticle(this.get('controller.model'));
    }

  }

});
