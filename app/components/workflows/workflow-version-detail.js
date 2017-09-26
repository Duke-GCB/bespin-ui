import Ember from 'ember';

export default Ember.Component.extend({
  workflowVersion: null,
  workflowMarkdown: Ember.computed('workflowVersion.methodsDocument.contents', function() {
    const descriptionHeader = '### Description';
    const description = this.get('workflowVersion.description');
    const methodsMarkdown = this.get('workflowVersion.methodsDocument.contents');
    return `${descriptionHeader}\n${description}\n\n${methodsMarkdown}`;
  })
});
