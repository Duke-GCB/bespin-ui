import Ember from 'ember';

const JobName = Ember.Component.extend({
  tagName: 'div',
});

JobName.reopenClass({
  positionalParams: ['answerSet']
});

export default JobName;
