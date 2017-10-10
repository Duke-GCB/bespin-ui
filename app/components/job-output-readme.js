import Ember from 'ember';

export default Ember.Component.extend({
  loading: false,
  outputDir: null,
  readmeMarkdown: null,
  didInsertElement() {
    const component = this;
    this._super(...arguments);
    component.set('loading', true);
    this.get('outputDir').then(function(outputDir) {
      outputDir.readmeURL(outputDir.get('id')).then(function (response) {
        const urlInfo = response['job-output-dirs'];
        const url = `${urlInfo.host}${urlInfo.url}`;
        Ember.$.get(url).then(function(data) {
          component.set('readmeMarkdown', data)
          component.set('loading', false);
        });
      })
    });
  }
});
