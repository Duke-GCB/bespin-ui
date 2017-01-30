import Ember from 'ember';

const AnswersBase = Ember.Component.extend({
  store: Ember.inject.service(),
  modelName: null, // Must be overridden
  occurs: 0,
  readOnly: Ember.computed('systemProvidedAnswers.length', function() {
    let numReadOnlyAnswers = this.get('systemProvidedAnswers.length');
    return numReadOnlyAnswers > 0;
  }),
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
  // Now for the typedAnswerValues, e.g. stringAnswer
  answerValues: Ember.computed('readOnly', 'answers.[]', 'modelName', function() {
    const answers = this.get('answers');
    const readOnly = this.get('readOnly');
    const modelName = this.get('modelName');
    const store = this.get('store');
    if(readOnly) {
      // if read-only, look them up!
      return store.query(modelName, {
        answers: answers.mapBy('id')
      });
    } else {
      // make new ones
      let answerValues = answers.map(function(answer) {
        return store.createRecord(modelName, { answer: answer});
      });
      return answerValues;
    }
  })
});

AnswersBase.reopenClass({
  positionalParams: ['occurs', 'systemProvidedAnswers', 'userProvidedAnswers']
});

export default AnswersBase;
