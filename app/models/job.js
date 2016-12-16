import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr('string'),
  workflowVersion: DS.belongsTo('workflow-version')
});
