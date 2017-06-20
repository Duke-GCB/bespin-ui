import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('jobs');
    },
    next(workflow) {
      let workflowVersionId = workflow.get('latestVersion.id');
      this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
    }
  },
});
