import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  workflowVersion: null,
  sortedVersions: computed('model.versions.@each.versionSort', function() {
    return this.get('model.versions').sortBy('versionSort');
  }),
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
