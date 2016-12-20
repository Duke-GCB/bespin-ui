import Ember from 'ember';

let WorkflowPickerComponent = Ember.Component.extend({
  selectedWorkflow: null,
  actions: {
    pick(workflow) {
      this.set('selectedWorkflow', workflow);
    }
  }
});

WorkflowPickerComponent.reopenClass({
  positionalParams: ['workflows']
});

export default WorkflowPickerComponent;
