import Ember from 'ember';

const WorkflowDetailRow = Ember.Component.extend({
  selected: Ember.computed('{workflow,selectedWorkflow}', function () {
    return this.get('workflow') === this.get('selectedWorkflow');
  }),
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
