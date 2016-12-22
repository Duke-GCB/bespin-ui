import Ember from 'ember';

const WorkflowDetailRow = Ember.Component.extend({
  actions: {
    pick() {
      this.get('onPick')(this.get('workflow'));
    }
  }
});

WorkflowDetailRow.reopenClass({
  positionalParams: ['workflow', 'selectedWorkflow', 'onPick']
});

export default WorkflowDetailRow;
