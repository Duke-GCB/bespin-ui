import Ember from 'ember';

const AnswerForm = Ember.Component.extend({
  classNames: ['container']
});

AnswerForm.reopenClass({
  positionalParams: ['answerSet']
});

export default AnswerForm;
