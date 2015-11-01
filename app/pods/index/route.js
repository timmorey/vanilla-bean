import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  model() {
    return this.get('parse').fetchAllArticles();
  }

});
