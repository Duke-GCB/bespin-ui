import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  store: Ember.inject.service(), // Needs access to store to create a job answer record
  classNames: ['well','well-sm'],
  question: null,
  questionnaireAnswers: [],
  questionAnswered: function() {},
  hasReadOnlyAnswers:Ember.computed('readOnlyAnswers.[]', function() {
    let length = this.get('readOnlyAnswers.length');
    return length > 0;
  }),
  readOnlyAnswers: Ember.computed('question', 'questionnaireAnswers.[]', function() {
    let question = this.get('question');
    let answers = this.get('questionnaireAnswers');
    if (!!question && !!answers) {
      return answers.filterBy('question.id', question.get('id'));
    } else {
      return null;
    }
  }),
  actions: {
    answered(typedJobAnswers, kind) {
      let store = this.get('store');
      let question = this.get('question');
      let callback = this.get('questionAnswered');
      typedJobAnswers.forEach(function(typedJobAnswer, index) {
        let jobAnswer = store.createRecord('job-answer', {
          index: index,
          kind: kind,
          question: question
        });
        function failure(reason) {
          Ember.Logger.error(`Failed because of ${reason}, ${Ember.inspect(reason)}`);
        }
        function success(savedJobAnswer) {
          // Can't set the typedJobAnswer's answer until we have an ID for the jobAnswer
          typedJobAnswer.set('answer', savedJobAnswer);
          typedJobAnswer.save().catch(failure);
          // Tell the callback that we have an answer
          // be careful not to save again in the callback or else we'll get async again...
          callback(savedJobAnswer);
        }
        jobAnswer.save().then(success).catch(failure);
      });
    }
  }
});

QuestionRow.reopenClass({
  positionalParams: ['question', 'questionnaireAnswers', 'questionAnswered']
});

export default QuestionRow;
