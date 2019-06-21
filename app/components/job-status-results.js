import Component from '@ember/component';

const JobStatusResults = Component.extend({
  job: null,
  tagName: 'span',
  classNames: ['job-status-results']
});

JobStatusResults.reopenClass({
  positionalParams: ['job']
});

export default JobStatusResults;
