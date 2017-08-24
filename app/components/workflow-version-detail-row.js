import Ember from 'ember';

const WorkflowVersionDetailRow = Ember.Component.extend({
  workflow: null
});

WorkflowVersionDetailRow.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionDetailRow;
