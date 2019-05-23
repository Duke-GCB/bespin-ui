import { computed } from '@ember/object';
import Component from '@ember/component';

const WorkflowDetail = Component.extend({
  classNames: ['workflow-detail'],
  workflow: null,
  sortedVersionsNewestFirst: computed('workflow.versions[]', function() {
    const versions = this.get('workflow.versions').sortBy('version').reverse();
    return versions;
  })
});

WorkflowDetail.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowDetail;
