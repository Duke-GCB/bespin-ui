import { inject as service } from '@ember/service';
import Component from '@ember/component';

const JobWatcher = Component.extend({
  watcher: service('bespin-job-watcher'),
  session: service('session'),
  job: null,
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

JobWatcher.reopenClass({
  positionalParams: ['job']
});

export default JobWatcher;
