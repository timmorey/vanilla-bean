import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('search', function() {
    this.route('results');
  });
  this.route('articles', function() {
    this.route('article', { path: '/:article_id' }, function() {
      this.route('edit', function() {
        this.route('summary');
        this.route('story');
        this.route('recipe');
        this.route('preview');
      });
    });
    this.route('new');
  });
});

export default Router;
