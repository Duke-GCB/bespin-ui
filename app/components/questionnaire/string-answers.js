import Ember from 'ember';

const StringAnswers = Ember.Component.extend({
  occurs: 0
});

StringAnswers.reopenClass({
  positionalParams: ['occurs']
});

export default StringAnswers;
