import Ember from 'ember';

const JobName = Ember.Component.extend({
  classNames: ['row']
});

JobName.reopenClass({
  positionalParams: ['answerSet']
});

export default JobName;
