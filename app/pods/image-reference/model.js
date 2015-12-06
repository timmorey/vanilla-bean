import Ember from 'ember';
import ParseImageReference from './parse/model';

const {
  computed
} = Ember;

const ImageReference = Ember.Object.extend({

  id: '',
  ownerId: '',
  title: '',
  parseFile: null,

  imageUrl: computed('parseFile', function() {
    return this.get('parseFile').url();
  }),

  fromParseObject(parseObject) {
    this.set('id', parseObject.id);
    this.set('ownerId', parseObject.get('ownerId'));
    this.set('title', parseObject.get('title'));
    this.set('parseFile', parseObject.get('image'));
  },

  toParseObject() {
    const parseImageReference = new ParseImageReference();
    if (this.get('id')) {
      parseImageReference.id = this.get('id');
    }
    parseImageReference.set('ownerId', this.get('ownerId'));
    parseImageReference.set('title', this.get('title'));
    parseImageReference.set('image', this.get('parseFile'));
    return parseImageReference;
  },

  isEqual(imageReference) {
    return this.get('id') === imageReference.get('id') &&
      this.get('ownerId') === imageReference.get('ownerId') &&
      this.get('title') === imageReference.get('title') &&
      this.get('parseFile') === imageReference.get('parseFile');
  },

  copy() {
    return ImageReference.create({
      id: this.get('id'),
      ownerId: this.get('ownerId'),
      title: this.get('title'),
      parseFile: this.get('parseFile')
    });
  }

});

export default ImageReference;
