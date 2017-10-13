import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /**
   * Custom actions for job-dds-output-project
   */
  readmeURL(id) {
    const url = `${this.buildURL('job-dds-output-project', id)}readme-url/`;
    return this.ajax(url, 'POST');
  }
});
