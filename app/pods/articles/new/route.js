import Ember from 'ember';
import Article from 'vanilla-bean/pods/article/model';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  model() {
    const article = Article.create();
    return this.get('parse').saveArticle(article)
      .then(() => article);
  },

  redirect(article) {
    this.transitionTo('articles.article.edit', article);
  }

});
