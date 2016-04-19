import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({

  title: attr('string', { defaultValue: '' }),
  abstract: attr('string', { defaultValue: '' }),
  story: attr('string', { defaultValue: '' }),
  recipeJson: attr('string', { defaultValue: '' }),
  thumbnailUrl: attr('string'),
  dateCreated: attr('date'),
  dateModified: attr('date'),

});