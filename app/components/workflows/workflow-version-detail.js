import Ember from 'ember';

const WorkflowVersionDetail = Ember.Component.extend({
  classNames: ['workflow-version-detail'],
  workflowVersion: null,
});

WorkflowVersionDetail.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionDetail;
