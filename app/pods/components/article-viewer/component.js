import Ember from 'ember';
import preRender from 'vanilla-bean/utils/pre-render';

const { computed } = Ember;

export default Ember.Component.extend({

  classNames: ['article-viewer'],

  article: null,

  preRenderedContent: computed('article.content', function() {
    return preRender(this.get('article.content'));
  })

});
