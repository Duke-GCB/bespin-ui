import Ember from 'ember';

const AnswerFormHeader = Ember.Component.extend({
  classNames: ['row'],
  questionnaire: null,
  title: Ember.computed.alias('questionnaire.name'),
  subtitle: Ember.computed.alias('questionnaire.description')
});

AnswerFormHeader.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerFormHeader;
