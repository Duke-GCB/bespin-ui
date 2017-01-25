import Ember from 'ember';

const ReadOnlyAnswers = Ember.Component.extend({
  tagName: 'span',
  answers: null
});

ReadOnlyAnswers.reopenClass({
  positionalParams: ['answers']
});

export default ReadOnlyAnswers;
