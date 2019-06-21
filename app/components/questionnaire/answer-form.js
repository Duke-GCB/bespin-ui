import Component from '@ember/component';

const AnswerForm = Component.extend({
  answerFormErrors: null,
  classNames: ['container']
});

AnswerForm.reopenClass({
  positionalParams: ['answerSet', 'answerFormErrors']
});

export default AnswerForm;
