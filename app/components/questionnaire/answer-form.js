import Ember from 'ember';

const AnswerForm = Ember.Component.extend({
});

AnswerForm.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerForm;
