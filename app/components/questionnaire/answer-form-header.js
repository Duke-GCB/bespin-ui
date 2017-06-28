import Ember from 'ember';

const AnswerFormHeader = Ember.Component.extend({
  tagName: 'h2',
  questionnaire: null,
  title: Ember.computed.alias('questionnaire.name')
});

AnswerFormHeader.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerFormHeader;
