import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const AnswerFormHeader = Component.extend({
  classNames: ['row'],
  questionnaire: null,
  title: alias('questionnaire.name'),
  subtitle: alias('questionnaire.description')
});

AnswerFormHeader.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerFormHeader;
