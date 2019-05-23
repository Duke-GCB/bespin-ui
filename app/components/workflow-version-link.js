import Component from '@ember/component';

const WorkflowVersionLink = Component.extend({
  classNames: ['workflow-version-link'],
  tagName: 'span',
  workflowVersion: null
});

WorkflowVersionLink.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionLink;
