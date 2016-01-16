import Ember from 'ember';
import ImageReference from 'vanilla-bean/pods/image-reference/model';

const {
  RSVP: {
    all,
    hash
  }
} = Ember;

export default Ember.Route.extend({

  actions: {

    filesSelected(files) {
      let filesArray = [];
      for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
      }
      this.send('addImages', filesArray);
    }

  }
});
