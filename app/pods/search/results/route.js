import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({

  queryParams: {
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.findAll('article')
      .then(articles => articles.filter(article =>
        article.get('title').toLowerCase().indexOf(params.q.toLowerCase()) !== -1));
  }

});
