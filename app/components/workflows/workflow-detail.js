import Ember from 'ember';

const WorkflowDetail = Ember.Component.extend({
  classNames: ['workflow-detail'],
  workflow: null,
  sortedVersionsNewestFirst: Ember.computed('workflow.versions.@each.versionSort', function() {
    return this.get('workflow.versions').sortBy('versionSort').reverse();
  })
});

WorkflowDetail.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowDetail;
