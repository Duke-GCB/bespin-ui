import Ember from 'ember';

const StringAnswer = Ember.Component.extend({
  disabled: true,
  tagName: 'span',
  stringAnswer: null,
  actions: {
    answered() {
      Ember.Logger.log('answered');
    }
  }
});

StringAnswer.reopenClass({
  positionalParams: ['stringAnswer', 'disabled']
});

export default StringAnswer;
