import Component from '@ember/component';

const WorkflowVersionDetail = Component.extend({
  classNames: ['workflow-version-detail'],
  workflowVersion: null,
});

WorkflowVersionDetail.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionDetail;
