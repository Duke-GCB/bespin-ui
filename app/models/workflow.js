import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  description: DS.attr('string')
});
