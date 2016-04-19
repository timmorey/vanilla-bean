import Ember from 'ember';

const {
  computed,
  Component
} = Ember;

export default Component.extend({

  classNames: ['article-editor'],

  article: null,

  hasUnsavedChanges: computed.notEmpty('article.dirtyType'),

  actions: {

    save() {
      this.sendAction('save');
    }

  }

});
