import Ember from 'ember';

let ProjectsPickerComponent = Ember.Component.extend({
  selectedProject: null,
  actions: {
    pick(project) {
      this.set('selectedProject', project);
    }
  }
});

ProjectsPickerComponent.reopenClass({
  positionalParams: ['projects']
});

export default ProjectsPickerComponent;
