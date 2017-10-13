import Ember from 'ember';

export default Ember.Component.extend({
  outputProject: null,
  readmeMarkdown: null,
  fetchReadmeErrors: null,
  ddsUrlFetcher: Ember.inject.service(),
  didInsertElement() {
    this._super(...arguments);
    const component = this;
    let outputProject = this.get('outputProject');
    this.get('ddsUrlFetcher').fetchReadmeUrl(outputProject).then(
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
