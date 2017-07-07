import Ember from 'ember';

const JobAuthorize = Ember.Component.extend({
  runJobToken: '',
  actions: {
    authorize() {
      const runJobToken = this.get('runJobToken');
      this.get('job').setRunToken(runJobToken);
    }
  }
});

JobAuthorize.reopenClass({
  positionalParams: ['job']
});


export default JobAuthorize;
