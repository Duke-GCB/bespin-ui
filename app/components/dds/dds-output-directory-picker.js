import Ember from 'ember';

const DDSOutputDirectoryPicker = Ember.Component.extend({
  projects: null,
  project: null,
  directoryName: null,
  changed() {
    this.get('onChange')(this.get('project'), this.get('directoryName'));
  },
  actions: {
    projectChanged(project) {
      this.set('project', project);
      this.changed();
    },
    directoryNameChanged() {
      this.changed();
    }
  },
  init() {
    this.set('projects', []);
    this._super(...arguments);
  }
});

DDSOutputDirectoryPicker.reopenClass({
  positionalParams: ['projects', 'directoryName', 'onChange']
});

export default DDSOutputDirectoryPicker;
