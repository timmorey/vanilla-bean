import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['image-reference'],

  imageReference: null,

  actions : {

    remove() {
      this.sendAction('remove', this.get('imageReference'));
    }
  }

});
