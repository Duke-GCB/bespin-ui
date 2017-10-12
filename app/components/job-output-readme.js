import Ember from 'ember';

export default Ember.Component.extend({
  outputDir: null,
  readmeMarkdown: null,
  fetchReadmeErrors: null,
  ddsUrlFetcher: Ember.inject.service(),
  didInsertElement() {
    this._super(...arguments);
    const component = this;
    let outputDir = this.get('outputDir');
    this.get('ddsUrlFetcher').fetchReadmeUrl(outputDir).then(
      function (data) {
        component.set('readmeMarkdown', data);
        component.set('fetchReadmeErrors', null);
      },
      function (adapterError) {
        component.set('readmeMarkdown', '');
        component.set('fetchReadmeErrors', adapterError.errors);
      });
  },
});
