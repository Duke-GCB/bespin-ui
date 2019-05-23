import Controller from '@ember/controller';

export default Controller.extend({
  workflowVersion: null,
  actions: {
    back() {
      this.transitionToRoute('jobs.new.select-workflow');
    },
    next() {
      let workflowVersionId = this.get('workflowVersion.id');
      this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
    },
    setWorkflowVersion(workflowVersion) {
      this.set('workflowVersion', workflowVersion);
    }
  },
});
