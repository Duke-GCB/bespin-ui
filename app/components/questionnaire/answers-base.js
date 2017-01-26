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
  answers: Ember.computed('systemProvidedAnswers', function() {
    let systemProvidedAnswers = this.get('systemProvidedAnswers');
    if (systemProvidedAnswers) {
      return systemProvidedAnswers;
    } else {
      Ember.Logger.debug('make some new answers');
      return userProvidedAnswers;
    }
  }),
});

AnswersBase.reopenClass({
  positionalParams: ['occurs', 'systemProvidedAnswers', 'userProvidedAnswers']
});

export default AnswersBase;
