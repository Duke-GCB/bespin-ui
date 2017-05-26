import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  workflowVersion: DS.belongsTo('workflow-version'),
  systemJobOrder: DS.attr('string'), // This is JSON
  userFields: DS.attr('string'), // This is JSON
  vmFlavor: DS.belongsTo('vm-flavor'),
  vmProject: DS.belongsTo('vm-project')
});
