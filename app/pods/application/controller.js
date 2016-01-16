import Ember from 'ember';

const {
  computed,
  Controller
} = Ember;

export default Controller.extend({

  searchString: '',

  fixedHeader: computed('currentPath', function() {
    return this.get('currentPath').indexOf('articles.article') !== 0;
  }),

  actions: {
    search: function() {
      if (this.get('searchString')) {
        this.transitionToRoute('search.results', { queryParams: { q: this.get('searchString') }});
      }
    }
  }
});
