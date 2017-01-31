import Ember from 'ember';

const QuestionList = Ember.Component.extend({
  questionnaire: null,
  answerSet: null,

  //
  populateAnswers() {
    let store = this.get('store');
    let question = this.get('question');
    let questionnaire = this.get('questionnaire');
    store.query('job-answer', {
      question: question.get('id'),
      questionnaire: questionnaire.get('id')
    }).then(systemProvidedAnswers => {
      this.set('systemProvidedAnswers', systemProvidedAnswers);
      if(systemProvidedAnswers.get('length') > 0) {
        this.set('userProvidedAnswers', []);
      } else {
        let userProvidedAnswers = [];
        for (let index = 0; index < question.get('occurs'); index++) {
          let jobAnswer = store.createRecord('job-answer', {
            index: index,
            kind: question.get('userAnswerKind'),
            question: question
          });
          userProvidedAnswers.push(jobAnswer);
        }
        Ember.Logger.log('setting userProvidedAnswers');
        this.set('userProvidedAnswers', userProvidedAnswers);
      }
    });
  },
});

QuestionList.reopenClass({
  positionalParams: ['questionnaire', 'answerSet']
});

export default QuestionList;
