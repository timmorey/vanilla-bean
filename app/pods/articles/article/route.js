import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('article', this._idFromNiceId(params.article_id));
  },

  serialize(model) {
    return { article_id: this._niceIdForArticle(model) };
  },

  _niceIdForArticle(article) {
    const safeTitle = article.get('title').replace(/ /g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
    return `${safeTitle}_${article.get('id')}`;
  },

  _idFromNiceId(niceId) {
    return niceId.substring(niceId.lastIndexOf('_') + 1);
  },

});
