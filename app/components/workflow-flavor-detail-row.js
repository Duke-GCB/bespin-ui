import Component from '@ember/component';

const WorkflowFlavorDetailRow = Component.extend({
  questionnaire: null
});

WorkflowFlavorDetailRow.reopenClass({
  positionalParams: ['questionnaire']
});

export default WorkflowFlavorDetailRow;
