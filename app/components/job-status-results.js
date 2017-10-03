import Ember from 'ember';

const JobStatusResults = Ember.Component.extend({
  job: null,
  tagName: 'span',
  classNames: ['job-status-results']
});

JobStatusResults.reopenClass({
  positionalParams: ['job']
});

export default JobStatusResults;
