import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  watcher: Ember.inject.service('bespin-job-watcher'),
  session: Ember.inject.service('session'),
  socketRef: null,
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
    var authData = this.get('session.data');
    if (authData && authData.authenticated) {
      return authData.authenticated.token;
    }
    return '';
  },
  getJobId() {
    var job = this.get('job');
    if (job) {
      return job.get('id');
    }
    return '';
  },
  didInsertElement() {
    this._super(...arguments);
    var watcher = this.get('watcher');
    var token = this.getAuthToken();
    var jobId = this.getJobId();
    watcher.startWatching(token, jobId);
  },
  willDestroyElement() {
    this._super(...arguments);
    var watcher = this.get('watcher');
    var token = this.getAuthToken();
    var jobId = this.getJobId();
    if (watcher) {
      watcher.stopWatching(token, jobId);
    }
  }
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
