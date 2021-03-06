import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['q'],

  q: null,

  actions: {

    openArticle(article) {
      this.transitionToRoute('articles.article', article);
    }

  }

});
