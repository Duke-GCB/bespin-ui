import Ember from 'ember';

export default Ember.Service.extend({
  fetchReadmeUrl(outputProject) {
    const fetchUrl = this.get('fetchUrl');
    return outputProject.readmeURL().then(function (response) {
      const urlInfo = response['dds-file-url'];
      const url = `${urlInfo.host}${urlInfo.url}`;
      return fetchUrl(url);
    });
  },
  fetchUrl(url) {
    return Ember.$.get(url);
  }
});
