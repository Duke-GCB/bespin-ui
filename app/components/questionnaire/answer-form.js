import Ember from 'ember';

const AnswerForm = Ember.Component.extend({
});

AnswerForm.reopenClass({
  positionalParams: ['answerSet']
});

export default AnswerForm;
