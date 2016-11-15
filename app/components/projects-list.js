import Ember from 'ember';

const ProjectsListComponent = Ember.Component.extend({
});

ProjectsListComponent.reopenClass({
  positionalParams: ['projects']
});

export default ProjectsListComponent;
