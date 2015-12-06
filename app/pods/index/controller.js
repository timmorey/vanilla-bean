import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    openArticle(article) {
      this.transitionToRoute('articles.article', article);
    }

  }
});
