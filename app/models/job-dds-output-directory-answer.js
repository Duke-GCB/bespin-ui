import DS from 'ember-data';

export default DS.Model.extend({
  answer: DS.belongsTo('job-answer'),
  project: DS.belongsTo('dds-project'),
  directoryName: DS.attr('string'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential')
});
