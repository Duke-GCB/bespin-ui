import Ember from 'ember';

const WorkflowVersionDetailRow = Ember.Component.extend({
  workflow: null
});

WorkflowVersionDetailRow.reopenClass({
  positionalParams: ['version']
});

export default WorkflowVersionDetailRow;
