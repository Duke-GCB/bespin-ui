import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['well','well-sm'],
  question: null,
  questionnaire: null,
  answerSet: null,
  userProvidedAnswers: [],
  systemProvidedAnswers: []
});

QuestionRow.reopenClass({
  positionalParams: ['question', 'questionnaire', 'answerSet']
});

export default QuestionRow;
