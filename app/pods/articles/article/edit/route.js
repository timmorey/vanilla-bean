import Ember from 'ember';

const {
  get,
  set,
  Route,
} = Ember;

export default Route.extend({

  redirect(model, transition) {
    if (transition.targetName === 'articles.article.edit.index') {
      this.transitionTo('articles.article.edit.summary');
    }
  },

  actions: {

    save() {
      set(this, 'controller.model.dateModified', new Date());
      get(this, 'controller.model').save();
    }

  }

});
