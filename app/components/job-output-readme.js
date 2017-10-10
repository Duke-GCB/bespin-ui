import Ember from 'ember';

export default Ember.Component.extend({
  loading: false,
  outputDir: null,
  readmeMarkdown: null,
  fetchReadmeErrors: null,
  didInsertElement() {
    this._super(...arguments);
    const component = this;
    function fetchReadmeFailed(adapterError) {
      component.set('loading', false);
      component.set('readmeMarkdown', '');
      component.set('fetchReadmeErrors', adapterError.errors);
    }
    let outputDir = this.get('outputDir');
    if (outputDir) {
      component.set('loading', true);
      outputDir.then(function(outputDir2) {
        outputDir2.readmeURL(outputDir2.get('id')).then(function (response) {
          const urlInfo = response['dds-file-url'];
          const url = `${urlInfo.host}${urlInfo.url}`;
          Ember.$.get(url).then(function(data) {
            component.set('loading', false);
            component.set('readmeMarkdown', data)
          }, fetchReadmeFailed);
        }, fetchReadmeFailed);
      });
    }
  },
});
