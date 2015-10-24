import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  abstract: DS.attr('string'),
  content: DS.attr('string'),
  author: DS.attr('string'),

  published: DS.attr('boolean'),
  dateCreated: DS.attr('date'),
  dateModified: DS.attr('date'),

});
