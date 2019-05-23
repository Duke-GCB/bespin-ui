import { computed } from '@ember/object';
import Component from '@ember/component';

const JobSummary = Component.extend({
  tagName: 'div',
  classNames: ['row', 'job-summary'],
  job: null,
  workflowTitle: computed('job.workflowVersion.{workflow.name,version}', function() {
    const workflowName = this.get('job.workflowVersion.workflow.name');
    const versionNumber = this.get('job.workflowVersion.version');
    return `${workflowName} - Version ${versionNumber}`;
  })
});

JobSummary.reopenClass({
  positionalParams: ['job']
});

export default JobSummary
