import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'div',

  content: '',

  renderContent: function() {
    this.set('layout', Ember.HTMLBars.compile(this.get('content')));
    this.rerender(); // <- necessary?
  }.on('init'),

});
