import DS from 'ember-data';

export default DS.Model.extend({
  answer: DS.belongsTo('job-answer'),
  project: DS.belongsTo('dds-project'),
  file: DS.belongsTo('dds-resource'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential')
});
