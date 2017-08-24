import Ember from 'ember';

const WorkflowLatestVersionDetailRow = Ember.Component.extend({
  workflow: null
});

WorkflowLatestVersionDetailRow.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowLatestVersionDetailRow;
