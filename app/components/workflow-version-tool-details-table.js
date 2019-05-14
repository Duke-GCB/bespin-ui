import Ember from 'ember';

const WorkflowVersionToolDetailsTable = Ember.Component.extend({
  toolDetails: null,
  rows: Ember.computed('toolDetails.details', function() {
    const details = this.getWithDefault('toolDetails.details', []);
    return details.sortBy('tool_name');
  })
});

WorkflowVersionToolDetailsTable.reopenClass({
  positionalParams: ['toolDetails']
});

export default WorkflowVersionToolDetailsTable;
