import Ember from 'ember';
import ArticleViewModel from 'vanilla-bean/pods/article/view-model/model';

const {
  computed,
  Component
} = Ember;

export default Component.extend({

  classNames: ['article-editor'],

  article: null,

  articleViewModel: computed('article', 'article.updatedDate', function() {
    if (this.get('article') instanceof ArticleViewModel) {
      return this.get('article');
    }

    return ArticleViewModel.create({ article: this.get('article') });
  }),

  actions: {

    save() {
      this.sendAction('save');
    }

  }

});
