import Ember from 'ember';

const JobSummary = Ember.Component.extend({
  tagName: 'div',
  classNames: ['row', 'job-summary'],
  job: null,
  workflowTitle: Ember.computed('job.workflowVersion.workflow.name', 'job.workflowVersion.version', function() {
    const workflowName = this.get('job.workflowVersion.workflow.name');
    const versionNumber = this.get('job.workflowVersion.version');
    return `${workflowName} - Version ${versionNumber}`;
  })
});

JobSummary.reopenClass({
  positionalParams: ['job']
});

export default JobSummary
