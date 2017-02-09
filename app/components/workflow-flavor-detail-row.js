import Ember from 'ember';

const WorkflowFlavorDetailRow = Ember.Component.extend({
  questionnaire: null
});

WorkflowFlavorDetailRow.reopenClass({
  positionalParams: ['questionnaire']
});

export default WorkflowFlavorDetailRow;
