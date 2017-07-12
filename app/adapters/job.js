import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /**
   * Custom actions for controlling jobs
   */
  start(id) {
    return this.ajax(this.urlForJobControlAction(id, 'start'), 'POST');
  },
  cancel(id) {
    return this.ajax(this.urlForJobControlAction(id, 'cancel'), 'POST');
  },
  restart(id) {
    return this.ajax(this.urlForJobControlAction(id, 'restart'), 'POST');
  },
  authorize(id, jobTokens) {
    return this.ajax(this.urlForJobControlAction(id, 'authorize'), 'POST', {
      data: jobTokens
    });
  },
  urlForJobControlAction(id, action) {
    return `${this.buildURL('job', id)}${action}/`;
  }

});
