import Ember from 'ember';

const WorkflowVersionSummary = Ember.Component.extend({
  classNames: ['workflow-version-summary'],
  workflowVersion: null
});

WorkflowVersionSummary.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionSummary;
