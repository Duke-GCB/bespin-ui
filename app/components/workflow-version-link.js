import Ember from 'ember';

const WorkflowVersionLink = Ember.Component.extend({
  classNames: ['workflow-version-link'],
  tagName: 'span',
  workflowVersion: null
});

WorkflowVersionLink.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionLink;
