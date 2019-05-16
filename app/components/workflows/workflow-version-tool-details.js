import Ember from 'ember';

const WorkflowVersionToolDetails = Ember.Component.extend({
  classNames: ['workflow-version-tool-details'],
  workflowVersion: null,
  toolDetails: Ember.computed.readOnly('workflowVersion.toolDetails')
});

WorkflowVersionToolDetails.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionToolDetails;
