import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  model(params) {
    return this.get('parse').fetchArticle(params.article_id);
  },

  actions: {

    refreshModel() {
      this.refresh();
    }

  }

});
