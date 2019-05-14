import Ember from 'ember';

const WorkflowVersionSummary = Ember.Component.extend({
  workflowVersion: null,
  versionTag: Ember.computed('workflowVersion.workflow.tag', 'workflowVersion.version', function() {
    const tag = this.get('workflowVersion.workflow.tag');
    const version = this.get('workflowVersion.version');
    return `${tag}/${version}`;
  }),
});

WorkflowVersionSummary.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionSummary;
