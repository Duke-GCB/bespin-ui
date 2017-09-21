import Ember from 'ember';

const JobStatus = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-status'],
  watcher: Ember.inject.service('bespin-job-watcher'),
  session: Ember.inject.service('session'),
  job: null,
  errorCollapsed: true,
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
  },
  toggleError() {
    this.toggleProperty('errorCollapsed');
  }
});


JobStatus.reopenClass({
  positionalParams: ['job']
});

export default JobStatus;
