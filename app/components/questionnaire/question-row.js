import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  store: Ember.inject.service(), // Needs access to store to create a job answer record
  classNames: ['well','well-sm'],
  question: null,
  questionnaireAnswers: [],
  questionAnswered: function() {},
  questionnaireAnswer: Ember.computed('question', 'questionnaireAnswers.[]', function() {
    let question = this.get('question');
    let answers = this.get('questionnaireAnswers');
    return answers.findBy('question.id', question.get('id'));
  }),
  actions: {
    answered(typedJobAnswers, kind) {
      let store = this.get('store');
      let question = this.get('question');
      // typedJobAnswers is an array of {answer:typedJobAnswer, index: i, kind: 'dds_file'}
      typedJobAnswers.forEach(function(typedJobAnswer, index) {
        let jobAnswer = store.createRecord('job-answer', {
          index: index,
          kind: kind,
          question: question
        });
        jobAnswer.save().then(function() {
          // Can't set the typedJobAnswer's answer until we have an ID for the jobAnswer
          typedJobAnswer.set('answer', jobAnswer);
          typedJobAnswer.save();
        });
      });
      // Will have multiple answers
      this.get('questionAnswered')(typedJobAnswers);
    }
  }
});

QuestionRow.reopenClass({
  positionalParams: ['question', 'questionnaireAnswers', 'questionAnswered']
});

export default QuestionRow;
