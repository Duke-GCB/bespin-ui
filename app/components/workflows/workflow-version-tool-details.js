import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';

const WorkflowVersionToolDetails = Component.extend({
  classNames: ['workflow-version-tool-details'],
  workflowVersion: null,
  toolDetails: readOnly('workflowVersion.toolDetails')
});

WorkflowVersionToolDetails.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionToolDetails;
