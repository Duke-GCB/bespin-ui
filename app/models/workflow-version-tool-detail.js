import DS from 'ember-data';

export default DS.Model.extend({
  workflowVersion: DS.belongsTo('workflow-version'),
  details: DS.attr(),
});
