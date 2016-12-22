import DS from 'ember-data';

export default DS.Model.extend({
  workflow: DS.belongsTo('workflow'),
  description: DS.attr('string'),
  objectName: DS.attr('string'),
  created: DS.attr('date'),
  url: DS.attr('string'),
  version: DS.attr('string'),
  jobs: DS.hasMany('job')
});
