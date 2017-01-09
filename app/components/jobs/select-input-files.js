import Ember from 'ember';

const SelectInputFiles = Ember.Component.extend({
  project: null,
  actions: {
    projectPicked(project) {
      this.set('project', project);
    }
  }
});

SelectInputFiles.reopenClass({
  positionalParams: ['projects']
});

export default SelectInputFiles;
