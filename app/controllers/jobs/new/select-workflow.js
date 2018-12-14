import Ember from 'ember';

export default Ember.Controller.extend({
  workflow: null,
  actions: {
    back() {
      this.transitionToRoute('jobs');
    },
    setWorkflow(workflow) {
      this.set('workflow', workflow);
    },
    next() {
      let workflowVersionId = this.get('workflow.latestEnabledVersion.id');
      if (workflowVersionId) {
        this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
      }
    }
  },
});
