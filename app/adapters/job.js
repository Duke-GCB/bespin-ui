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
  // The token authorizer mixin already defines an authorize() function, so this is called authorizeJob
  // https://github.com/jpadilla/ember-simple-auth-token/blob/master/addon/mixins/token-authorizer.js
  authorizeJob(id, jobTokens) {
    return this.ajax(this.urlForJobControlAction(id, 'authorize'), 'POST', {
      data: jobTokens
    });
  },
  urlForJobControlAction(id, action) {
    return `${this.buildURL('job', id)}${action}/`;
  },
  getLiveUsage(id) {
    const url = `${this.buildURL('job', id)}live_usage/`;
    return this.ajax(url, 'POST').then(response => {
      const jobUsage = response['job-usage'];
      return {
        cpuHours: jobUsage['cpu_hours'],
        vmHours: jobUsage['vm_hours']
      }
    })
  }
});
