import Ember from 'ember';
import moment from 'moment';

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
  isCurrentVersion: Ember.computed('workflowVersion.id', 'workflowVersion.workflow.latestEnabledVersion.id', function() {
    const latestEnabledVersionId = this.get('workflowVersion.workflow.latestEnabledVersion.id');
    const thisVersionId = this.get('workflowVersion.id');
    return latestEnabledVersionId == thisVersionId;
  }),
  title: Ember.computed('workflowVersion.workflow.name', 'workflowVersion.version', 'isCurrentVersion',
    'workflowVersion.created', function() {
      const workflowName = this.get('workflowVersion.workflow.name');
      let versionStr = this.get('workflowVersion.version');
      const createdStr = moment(this.get('workflowVersion.created')).format('LL');
      if (this.get('isCurrentVersion')) {
        versionStr += " (Current)";
      }
      return `${workflowName} - Version ${versionStr} - ${createdStr} `;
  })
});
