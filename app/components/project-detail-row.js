import Ember from 'ember';

const ProjectDetailRow = Ember.Component.extend({
  selected: Ember.computed('{project,selectedProject}', function () {
    return this.get('project') == this.get('selectedProject');
  }),
  actions: {
    pick() {
      this.get('onPick')(this.get('project'));
    }
  }
});

ProjectDetailRow.reopenClass({
  positionalParams: ['project','selectedProject','onPick']
});

export default ProjectDetailRow;
