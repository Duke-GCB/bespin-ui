import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /**
   * Custom actions for job-output-dir
   */
  readmeURL(id) {
    const url = `${this.buildURL('job-output-dir', id)}readme-url/`;
    return this.ajax(url, 'POST');
  }
});
