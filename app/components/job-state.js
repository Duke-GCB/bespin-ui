import Ember from 'ember';

const JobState = Ember.Component.extend({
  classNames: ['job-state', 'dl-horizontal'],
  tagName: 'dl',
  job: null
});

JobState.reopenClass({
  positionalParams: ['job']
});

export default JobState;
