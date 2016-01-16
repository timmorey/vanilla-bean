import Ember from 'ember';
import ImageReference from 'vanilla-bean/pods/image-reference/model';

const {
  inject,
  RSVP: {
    all,
    hash
  }
} = Ember;

export default Ember.Route.extend({

  parse: inject.service(),

  removedImages: [],

  redirect(model, transition) {
    if (transition.targetName === 'articles.article.edit.index') {
      this.transitionTo('articles.article.edit.summary');
    }
  },

  actions: {

    save() {
      this.get('parse').saveArticle(this.get('controller.model'));
      this.get('removedImages').forEach((imageReference) => {
        this.get('parse').removeImageReference(imageReference);
      });
      this.set('removedImages', []);
    },

    discardChanges() {
      this.get('parse').revertArticle(this.get('controller.model'));
      this.set('removedImages', []);
    },

    addImages(files) {
      all(files.map((file) => hash({
        file: file,
        parseFile: this.get('parse').addImage(file)
      })))
      .then(files => files.map(fileInfo => ImageReference.create({
        title: fileInfo.file.name,
        ownerId: this.get('controller.model.id'),
        parseFile: fileInfo.parseFile
      })))
      .then(imageReferences => this.set('controller.model.images', this.get('controller.model.images').concat(imageReferences)));
    },

    removeImage(imageReference) {
      this.get('removedImages').push(imageReference);
      this.set('controller.model.images', this.get('controller.model.images').filter(item => item !== imageReference));
    }

  }

});
