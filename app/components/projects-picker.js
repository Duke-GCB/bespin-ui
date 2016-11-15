import Ember from 'ember';

let ProjectsPickerComponent = Ember.Component.extend({
  selectedProject: null,
  actions: {
    pick(project) {
      Ember.Logger.info(`${project.name} was picked`);
      this.set('selectedProject', project);
    },
  }
});

ProjectsPickerComponent.reopenClass({
  positionalParams: ['projects']
});

export default ProjectsPickerComponent;
