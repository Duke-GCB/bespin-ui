import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  watcher: Ember.inject.service('bespin-job-watcher'),
  session: Ember.inject.service('session'),
  job: null,
  indent: 2,
  prettyJobOrder: Ember.computed('job.jobOrder', 'indent', function() {
    try {
      return JSON.stringify(JSON.parse(this.get('job.jobOrder')), undefined, this.get('indent'));
    } catch(e)  { // May not be valid JSON
      return this.get('job.jobOrder');
    }
  }),
  getAuthToken() {
    const authData = this.get('session.data');
    if (authData && authData.authenticated) {
      return authData.authenticated.token;
    }
    return '';
  },
  didInsertElement() {
    this._super(...arguments);
    const watcher = this.get('watcher');
    const token = this.getAuthToken();
    const jobId = this.get('job.id');
    watcher.startWatching(token, jobId);
  },
  willDestroyElement() {
    this._super(...arguments);
    const watcher = this.get('watcher');
    const token = this.getAuthToken();
    const jobId = this.get('job.id');
    if (watcher) {
      watcher.stopWatching(token, jobId);
    }
  }
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
