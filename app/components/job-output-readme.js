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
    component.set('loading', true);
    this.get('outputDir').then(function(outputDir) {
      outputDir.readmeURL(outputDir.get('id')).then(function (response) {
        const urlInfo = response['job-output-dirs'];
        const url = `${urlInfo.host}${urlInfo.url}`;
        Ember.$.get(url).then(function(data) {
          component.set('loading', false);
          component.set('readmeMarkdown', data)
        }, fetchReadmeFailed);
      }, fetchReadmeFailed);
    });
  },
});
