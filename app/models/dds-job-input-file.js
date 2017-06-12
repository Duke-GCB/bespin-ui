import DS from 'ember-data';

export default DS.Model.extend({
  projectId: DS.attr('string'),
  fileId: DS.attr('string'),
  destinationPath: DS.attr('string'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential')
});
