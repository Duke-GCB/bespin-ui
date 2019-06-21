import { computed } from '@ember/object';
import Component from '@ember/component';

const DDSProjectFilesPicker = Component.extend({
  projects: null,
  project: null,
  selectedResources: null,
  formatSettings: null,
  onFilePicked: (/* file */) => {},
  isLoading: computed('projects', function () {
    const projects = this.get('projects');
    return projects === null;
  }),
  isEmpty: computed('projects.length', function() {
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
