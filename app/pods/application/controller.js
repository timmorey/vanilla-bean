import Ember from 'ember';

export default Ember.Controller.extend({

  searchString: '',

  actions: {
    search: function() {
      if (this.get('searchString')) {
        this.transitionToRoute('search.results', { queryParams: { q: this.get('searchString') }});
      }
    }
  }
});
