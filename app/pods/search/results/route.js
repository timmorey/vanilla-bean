import Ember from 'ember';

const {
  inject,
  Route
} = Ember;

export default Route.extend({

  queryParams: {
    q: {
      refreshModel: true
    }
  },

  parse: inject.service(),

  model(params) {
    return this.get('parse').queryArticles(params.q);
  }
});
