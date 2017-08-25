import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('jobs.new.select-workflow');
    },
    next(workflowVersion) {
      let workflowVersionId = workflowVersion.get('id');
      this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
    }
  },
});
