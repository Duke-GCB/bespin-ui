import Ember from 'ember';

const WorkflowDetail = Ember.Component.extend({
  classNames: ['workflow-detail'],
  workflow: null,
  sortedVersionsNewestFirst: Ember.computed('workflow.versions[]', function() {
    const versions = this.get('workflow.versions').sortBy('version').reverse();
    return versions;
  })
});

WorkflowDetail.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowDetail;
