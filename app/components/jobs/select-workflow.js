import Ember from 'ember';

const SelectWorkflow = Ember.Component.extend({
  job: null,
  wizard: Ember.inject.service('new-job-wizard'),
  actions: {
    workflowChanged(workflow) {
      this.get('job').set('workflowVersion', workflow.get('latestVersion'));
    },
    next() {
      this.get('wizard').next();
    }
  }
});

SelectWorkflow.reopenClass({
  positionalParams: ['job','workflows']
});

export default SelectWorkflow;
