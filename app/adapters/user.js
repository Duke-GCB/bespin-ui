import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  queryRecord(modelName, query) {
    Ember.Logger.log('querying record');
    let url = 'http://localhost:8000/api/users/current-user/';
    Ember.Logger.log(url);
    // return Ember.$.getJSON(url);
    return this.ajax(url, 'GET', {});
  }
});
