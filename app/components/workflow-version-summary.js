import Ember from 'ember';

const WorkflowVersionSummary = Ember.Component.extend({
  workflowVersion: null,
  showVersionLink: false,
});

WorkflowVersionSummary.reopenClass({
  positionalParams: ['workflowVersion', 'showVersionLink']
});

export default WorkflowVersionSummary;
