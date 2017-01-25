import Ember from 'ember';

const StringAnswer = Ember.Component.extend({
  resource: null,
  tagName: 'span',
  actions: {
    answered(value) {
      console.log(value);
    }
  }
});

StringAnswer.reopenClass({
  positionalParams: ['value']
});

export default StringAnswer;
