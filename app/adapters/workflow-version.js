import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  getVersionInfo(id) {
    const url = `${this.buildURL('workflow-version', id)}version-info/`;
    return this.ajax(url, 'GET').then(response => {
      return response['workflow-version-info-contents'];
    });
  }
});
