import DS from 'ember-data';

export default DS.Model.extend({
  stageGroup: DS.belongsTo('job-file-stage-group'),
  projectId: DS.attr('string'),
  fileId: DS.attr('string'),
  destinationPath: DS.attr('string'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential'),
  size: DS.attr('number'),
  sequence: DS.attr('number'),
});
