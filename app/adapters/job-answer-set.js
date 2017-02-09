import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /**
   * Custom action for creating a job from a job-answer-set
   */
  createJob(id) {
    return this.ajax(this.urlForCreateJobAction(id), 'POST');
  },

  urlForCreateJobAction(id) {
    return `${this.buildURL('job-answer-set', id)}create-job/`;
  }

});
