import Ember from 'ember';

export default Ember.Component.extend({
  showMethods: false,
  workflowVersion: null,
  workflowMarkdown: Ember.computed('showMethods', 'workflowVersion.description',
    'workflowVersion.methodsDocument.contents', function() {
      if (this.get('showMethods')) {
        return this.get('workflowVersion.methodsDocument.contents');
      } else {
        const descriptionHeader = '# Description';
        const description = this.get('workflowVersion.description');
        return `${descriptionHeader}\n${description}`;
      }
  }),
  isCurrentVersion: Ember.computed('workflowVersion.id', 'workflowVersion.workflow.latestVersion.id', function() {
    const latestVersionId = this.get('workflowVersion.workflow.latestVersion.id');
    const thisVersionId = this.get('workflowVersion.id');
    return latestVersionId == thisVersionId;
  })
});
