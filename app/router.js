import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('search', function() {
    this.route('results');
  });
  this.route('article', { path: '/article/:article_id' });
});

export default Router;
