import Ember from 'ember';

const WorkflowPickerDetailRow = Ember.Component.extend({
  actions: {
    pick() {
      this.get('onPick')(this.get('workflow'));
    }
  }
});

WorkflowPickerDetailRow .reopenClass({
  positionalParams: ['workflow', 'selectedWorkflow', 'onPick']
});

export default WorkflowPickerDetailRow ;
