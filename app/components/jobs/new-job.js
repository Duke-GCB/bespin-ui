import Ember from 'ember';


// This is now useless

const NewJob = Ember.Component.extend({
  job: null,
  errors: [],
  workflows: [],
  actions: {
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
