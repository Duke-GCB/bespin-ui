import Ember from 'ember';

const WorkflowVersionToolDetailsTable = Ember.Component.extend({
  toolDetail: null,
  rows: Ember.computed('toolDetail.details', function() {
    const details = this.getWithDefault('toolDetail.details', []);
    return details.sortBy('tool_name');
  })
});

WorkflowVersionToolDetailsTable.reopenClass({
  positionalParams: ['toolDetail']
});

export default WorkflowVersionToolDetailsTable;
