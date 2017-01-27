import Ember from 'ember';

const WorkflowVersionDetailRow = Ember.Component.extend({
  workflow: null
});

WorkflowVersionDetailRow.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowVersionDetailRow;
