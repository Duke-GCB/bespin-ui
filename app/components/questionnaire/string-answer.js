import Ember from 'ember';

const StringAnswer = Ember.Component.extend({
  disabled: true,
  tagName: 'span',
  answerValuePair: null,
  actions: {
    answered() {
      Ember.Logger.log('answered');
    }
  },
  value: Ember.computed.alias('answerValuePair.jobAnswerValue.value')
});

StringAnswer.reopenClass({
  positionalParams: ['answerValuePair', 'disabled']
});

export default StringAnswer;
