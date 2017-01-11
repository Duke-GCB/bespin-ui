import Ember from 'ember';

const DDSProjectFilesPicker = Ember.Component.extend({
  projects: [],
  project: null,
  pickedFiles: [],
  actions: {
    projectPicked(project) {
      this.set('project', project);
    }
  }
});

DDSProjectFilesPicker.reopenClass({
  positionalParams: ['projects', 'project','pickedFiles']
});

export default DDSProjectFilesPicker;
