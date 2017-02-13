import DS from 'ember-data';

export default DS.Model.extend({
  dirName: DS.attr('string'),
  project: DS.belongsTo('dds-project'),
  job: DS.belongsTo('job'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential')
});
