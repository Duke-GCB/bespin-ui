import Ember from 'ember';

const JobName = Ember.Component.extend({
  classNames: ['row', 'job-name']
});

JobName.reopenClass({
  positionalParams: ['answerSet']
});

export default JobName;
