import { computed } from '@ember/object';
import Component from '@ember/component';

const WorkflowVersionToolDetailsTable = Component.extend({
  toolDetails: null,
  rows: computed('toolDetails.details', function() {
    const details = this.getWithDefault('toolDetails.details', []);
    return details.sortBy('tool_name');
  })
});

WorkflowVersionToolDetailsTable.reopenClass({
  positionalParams: ['toolDetails']
});

export default WorkflowVersionToolDetailsTable;
