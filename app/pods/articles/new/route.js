import Ember from 'ember';
import Article from 'vanilla-bean/pods/article/model';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  model() {
    return Article.create();
  },

  actions: {

    save() {
      const article = this.get('controller.model');
      this.get('parse').saveArticle(article)
        .then(() => this.transitionTo('articles.article.edit', article));
    },

    discardChanges() {
      this.refresh();
    }

  }

});
