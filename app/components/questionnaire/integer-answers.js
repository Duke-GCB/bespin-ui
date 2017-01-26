import Ember from 'ember';

const IntegerAnswers = Ember.Component.extend({
  occurs: 0
});

IntegerAnswers.reopenClass({
  positionalParams: ['occurs']
});

export default IntegerAnswers;
