import Ember from 'ember';

const NewJob = Ember.Component.extend({
  job: null,
  errors: [],
  workflows: [],
  actions: {
    workflowChanged(workflow) {
      console.log('workflow changed to ' + workflow.get('name'));
      console.log('setting job workflow version to ' +  workflow.get('latestVersion').get('url'));
      console.log('this job is' + this.get('job').get('name'));
      this.get('job').set('workflowVersion', workflow.get('latestVersion'));
    },
    create() {
      console.log('create clicked!');
      let job = this.get('job');
      job.save().then(() => {
        //ok
      }, () => {
        // error
        this.set('errors', job.get('errors'));
      });
    }
  }
});

NewJob.reopenClass({
  positionalParams: ['job','workflows']
});

export default NewJob;
