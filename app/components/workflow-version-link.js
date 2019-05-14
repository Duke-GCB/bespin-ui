import Ember from 'ember';

const WorkflowVersionLink = Ember.Component.extend({
  tagName: 'span',
  workflowVersion: null
});

WorkflowVersionLink.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionLink;
