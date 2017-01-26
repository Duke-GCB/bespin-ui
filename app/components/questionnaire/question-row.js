import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['well','well-sm'],
  question: null,
  questionnaire: null,
  systemProvidedAnswers: Ember.computed('question', function() {
    let store = this.get('store');
    let question = this.get('question');
    let questionnaire = this.get('questionnaire');
    return store.query('job-answer', {
      question: question.get('id'),
      questionnaire: questionnaire.get('id')
    });
  }),
  userProvidedAnswers: Ember.computed('question', 'systemProvidedAnswers.[]', function() {
    let store = this.get('store');
    let question = this.get('question');
    let systemProvidedAnswers = this.get('systemProvidedAnswers');
    if(systemProvidedAnswers.get('length') > 0) {
      return [];
    }
    // If there are no systemProviderAnswers, make one job-answer for each occurs
    let userProvidedAnswers = [];
    for (let index = 0; index < question.get('occurs'); index++) {
      let jobAnswer = store.createRecord('job-answer', {
        index: index,
        kind: question.get('userAnswerKind'),
        question: question
      });
      userProvidedAnswers.push(jobAnswer);
    }
    return userProvidedAnswers;
  })
});

QuestionRow.reopenClass({
  positionalParams: ['question', 'questionnaire']
});

export default QuestionRow;
