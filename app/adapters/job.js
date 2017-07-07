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
  setRunToken(id, token) {
    const payload = {
      "token": token
    };
    //our adapter specifies rootobject format so we must put payload inside a job
    return this.ajax(this.urlForJobControlAction(id, 'set_run_token'), 'POST', {
      data: {
        jobs: payload
      }
    });
  },
  urlForJobControlAction(id, action) {
    return `${this.buildURL('job', id)}${action}/`;
  }

});
