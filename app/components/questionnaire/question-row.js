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
    Ember.Logger.log('calculating systemProvidedAnswers for ' + question.get('id'));
    return store.query('job-answer', {
      question: question.get('id'),
      questionnaire: questionnaire.get('id')
    });
  })
});

QuestionRow.reopenClass({
  positionalParams: ['question', 'questionnaire']
});

export default QuestionRow;
