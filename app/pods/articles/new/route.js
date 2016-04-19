import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Route.extend({

  model() {
    const article = this.store.createRecord('article', {
      title: 'new article',
      dateCreated: new Date(),
      dateModified: new Date(),
    });
    article.save().then(() => this.transitionTo('articles.article.edit', article));
    return article;
  },

  actions: {

    save() {
      const article = get(this, 'controller.model');
      article.save().then(() => this.transitionTo('articles.article.edit', article));
    }

  }

});
