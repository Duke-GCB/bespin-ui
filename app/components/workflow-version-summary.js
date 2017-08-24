import Ember from 'ember';

const WorkflowVersionSummary = Ember.Component.extend({
  workflowVersion: null
});

WorkflowVersionSummary.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionSummary;
