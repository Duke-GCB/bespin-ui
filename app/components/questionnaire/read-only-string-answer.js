import Ember from 'ember';

const ReadOnlyStringAnswer = Ember.Component.extend({
  tagName: 'span',
  jobStringAnswer: null
});

ReadOnlyStringAnswer.reopenClass({
  positionalParams: ['jobStringAnswer']
});

export default ReadOnlyStringAnswer;
