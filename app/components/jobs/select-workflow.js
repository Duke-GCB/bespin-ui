import Ember from 'ember';

const SelectWorkflow = Ember.Component.extend({
  job: null,
  actions: {
    workflowChanged(workflow) {
      this.get('job').set('workflowVersion', workflow.get('latestVersion'));
    }
  }
});

SelectWorkflow.reopenClass({
  positionalParams: ['job','workflows']
});

export default SelectWorkflow;
