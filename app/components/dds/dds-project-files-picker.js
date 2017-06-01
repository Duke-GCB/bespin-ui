import Ember from 'ember';

const DDSProjectFilesPicker = Ember.Component.extend({
  projects: null,
  project: null,
  onFilePicked: function(/* file */) {},
  actions: {
    projectChanged(project) {
      this.set('project', project);
    },
    filePicked(file) {
      this.get('onFilePicked')(file);
    }
  },
  init() {
    this.set('projects', []);
    this._super(...arguments);
  }
});

DDSProjectFilesPicker.reopenClass({
  positionalParams: ['projects', 'onFilePicked']
});

export default DDSProjectFilesPicker;
