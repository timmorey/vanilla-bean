import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  model(params) {
    return this.get('parse').fetchArticle(this._idFromNiceId(params.article_id));
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

  actions: {

    refreshModel() {
      this.refresh();
    }

  }

});
