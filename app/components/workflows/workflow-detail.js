import { computed } from '@ember/object';
import Component from '@ember/component';

const WorkflowDetail = Component.extend({
  classNames: ['workflow-detail'],
  workflow: null,
  sortedVersionsNewestFirst: computed('workflow.versions.@each.versionSort', function() {
    return this.get('workflow.versions').sortBy('versionSort').reverse();
  })
});

WorkflowDetail.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowDetail;
