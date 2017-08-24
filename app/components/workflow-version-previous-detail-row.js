import Ember from 'ember';

const WorkflowVersionPreviousDetailRow = Ember.Component.extend({
  workflow: null
});

WorkflowVersionPreviousDetailRow.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionPreviousDetailRow;
