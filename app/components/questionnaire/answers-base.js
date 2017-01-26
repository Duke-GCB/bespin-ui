import Ember from 'ember';

const AnswersBase = Ember.Component.extend({
  layoutName: 'components/questionnaire/answers-base',
  occurs: 0,
  readOnly: Ember.computed('systemProvidedAnswers.length', function() {
    let numReadOnlyAnswers = this.get('systemProvidedAnswers.length');
    return numReadOnlyAnswers > 0;
  }),
  kind: null,
  systemProvidedAnswers: null, // Just for THIS question
  userProvidedAnswers: null,
  answers: Ember.computed('readOnly', 'systemProvidedAnswers', 'userProvidedAnswers', function() {
    let readOnly = this.get('readOnly');
    if (readOnly) {
      return this.get('systemProvidedAnswers');
    } else {
      return this.get('userProvidedAnswers');
    }
  }),
});

AnswersBase.reopenClass({
  positionalParams: ['occurs', 'systemProvidedAnswers', 'userProvidedAnswers']
});

export default AnswersBase;
