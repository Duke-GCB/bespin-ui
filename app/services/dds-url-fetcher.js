import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({
  fetchReadmeUrl(outputProject) {
    const fetchUrl = this.get('fetchUrl');
    return outputProject.readmeURL().then(function (response) {
      const urlInfo = response['dds-file-url'];
      const url = `${urlInfo.host}${urlInfo.url}`;
      return fetchUrl(url);
    });
  },
  fetchUrl(url) {
    return $.get(url);
  }
});
