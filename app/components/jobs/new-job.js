import Ember from 'ember';

const NewJob = Ember.Component.extend({
  actions: {
    workflowChanged(workflow) {
      console.log('workflow changed to ' + workflow.get('name'));
      console.log('setting job workflow version to ' +  workflow.get('latestVersion').get('url'));
      console.log('this job is' + this.get('job').get('name'));
      this.get('job').set('workflowVersion', workflow.get('latestVersion'));
    }
  }
});

NewJob.reopenClass({
  positionalParams: ['job','workflows']
});

export default NewJob;
