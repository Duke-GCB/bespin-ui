import DS from 'ember-data';

export default DS.Model.extend({
  workflowVersion: DS.belongsTo('workflow-version'),
  created: DS.attr('date'),
  state: DS.attr('string'),
  step: DS.attr('string'),
  lastUpdated: DS.attr('date'),
  vmFlavor: DS.attr('string'),
  vmInstanceName: DS.attr('string'),
  vmProjectName: DS.attr('string'),
  workflowInputJson: DS.attr('string'), // These will be JSON - can we add a transform?
  outputDir: DS.attr('string') // Don't have an API for this yet, how do we create output dirs?
});
