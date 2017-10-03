import Ember from 'ember';

const DDSProjectFilesPicker = Ember.Component.extend({
  projects: null,
  project: null,
  selectedResources: null,
  formatSettings: null,
  onFilePicked: (/* file */) => {},
  isLoading: Ember.computed('projects', function () {
    const projects = this.get('projects');
    return projects === null;
  }),
  isEmpty: Ember.computed('projects.length', function() {
    const length = this.get('projects.length');
    return length === 0;
  }),
  actions: {
    projectChanged(project) {
      this.set('project', project);
    },
    filePicked(file) {
      this.get('onFilePicked')(file);
    }
  }
});

DDSProjectFilesPicker.reopenClass({
  positionalParams: ['projects', 'selectedResources', 'onFilePicked']
});

export default DDSProjectFilesPicker;
