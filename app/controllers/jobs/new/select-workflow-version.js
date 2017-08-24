import Ember from 'ember';

export default Ember.Controller.extend({
  title: Ember.computed('', function() {
    return 'Please select the version of \'' + this.get('model.name') + '\' to run'
  }),
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
