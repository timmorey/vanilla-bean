import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    search: function() {
      this.transitionToRoute('search.results', { queryParams: { q: this.get('searchString') }});
    }
  }
});
