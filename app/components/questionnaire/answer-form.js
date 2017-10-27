import Ember from 'ember';

const AnswerForm = Ember.Component.extend({
  answerFormErrors: null,
  classNames: ['container']
});

AnswerForm.reopenClass({
  positionalParams: ['answerSet', 'answerFormErrors']
});

export default AnswerForm;
