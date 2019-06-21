import Component from '@ember/component';

const WorkflowVersionSummary = Component.extend({
  classNames: ['workflow-version-summary'],
  workflowVersion: null
});

WorkflowVersionSummary.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionSummary;
