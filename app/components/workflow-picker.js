import Ember from 'ember';

let WorkflowPickerComponent = Ember.Component.extend({
  selectedWorkflow: null,
  actions: {
    pick(workflow) {
      this.get('onPick')(workflow);
    }
  }
});

WorkflowPickerComponent.reopenClass({
  positionalParams: ['workflows', 'onPick']
});

export default WorkflowPickerComponent;
