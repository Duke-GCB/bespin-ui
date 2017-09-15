import Ember from 'ember';

const JobSummary = Ember.Component.extend({
  tagName: 'div',
  classNames: ['row', 'job-summary'],
  job: null,

});

JobSummary.reopenClass({
  positionalParams: ['job']
});

export default JobSummary
