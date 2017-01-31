import Ember from 'ember';

const QuestionProxy = Ember.Object.extend({
  question: null,
  systemAnswerValuePairs: [],
  userAnswerValuePairs: [],
  userJobAnswers: Ember.computed('userJobAnswerProxies', function() {
    return this.get('userJobAnswerProxies').mapBy('jobAnswer');
  })
});

const AnswerValuePair = Ember.Object.extend({
  jobAnswer: null,
  jobAnswerValue: null
});

export default Ember.Object.extend({
  questionProxies: [],

  init() {
    this._super(...arguments);
    this.load();
  },
    load() {
      let store = this.get('store');
      let questionnaire = this.get('questionnaire');
      // makes an answer set from a questionnaire and resolves when done
      let questions = questionnaire.get('questions').toArray();
      let systemJobAnswers = store.query('job-answer', {questionnaire: questionnaire.get('id')});
      let jobAnswerSet = Ember.RSVP.resolve(store.createRecord('job-answer-set', {questionnaire: questionnaire}));

      let promises = {
        questions: questions,
        jobAnswerSet: jobAnswerSet,
        systemJobAnswers: systemJobAnswers
      };
      Ember.RSVP.hash(promises).then(resolved => {
        // Now look up the individual typed answers
        const jobStringAnswers = store.query('job-string-answer', {answers: resolved.systemJobAnswers.mapBy('id')});
        const jobDDSFileAnswers = store.query('job-dds-file-answer', {answers: resolved.systemJobAnswers.mapBy('id')});

        // Carry forward stuff we already have
        let promises = {
          questions: resolved.questions,
          answerSet: resolved.answerSet,
          systemJobAnswers: resolved.systemJobAnswers,
          jobStringAnswers: jobStringAnswers,
          jobDDSFileAnswers: jobDDSFileAnswers
        };
        return Ember.RSVP.hash(promises);
      }).then(resolved => {
        // Have all data
        const {jobAnswerSet, systemJobAnswers, jobStringAnswers, jobDDSFileAnswers, questions} = resolved;
        // Build up our user answers list into the jobAnswerSet, so they are bound for later

        let systemQuestionIds = systemJobAnswers.mapBy('question.id');
        let systemQuestions = systemJobAnswers.mapBy('question');
        let questionProxies = questions.map(question => {
          let questionProxy = QuestionProxy.create({question: question});
          let questionId = question.get('id');
          if(systemQuestionIds.includes(questionId)) {
            let systemAnswerValuePairs = systemJobAnswers.filterBy('question.id', questionId).map(questionSystemAnswer => {
              // All system answers are job-string-answer
              let jobTypedAnswer = jobStringAnswers.findBy('answer.id', questionSystemAnswer.get('id'));
              let systemAnswerValuePair = AnswerValuePair.create({
                jobAnswer: questionSystemAnswer,
                jobTypedAnswer: jobTypedAnswer
              });
            });
            questionProxy.set('systemAnswerValuePairs', systemAnswerValuePairs);
          } else {
            // user question, make user answers
            // Make an answer/value pair for each occurrence
            let occurs = question.get('occurs');
            let kind = question.get('userAnswerKind');
            let userAnswerValuePairs = [];
            for(let i=0;i<occurs;i++) {
              // User answers are created empty but need to be linked to their question
              let jobAnswer = store.createRecord('job-answer', {
                index: i,
                kind: kind,
                question: question
              });
              let jobTypedAnswer = store.createRecord(question.get('modelForUserAnswerValue'), {
                answer: jobAnswer
              });
              let userAnswerValuePair = AnswerValuePair.create({
                jobAnswer: jobAnswer,
                jobTypedAnswer: jobTypedAnswer
              });
              userAnswerValuePairs.push(userAnswerValuePair);
            }
            questionProxy.set('userAnswerValuePairs', userAnswerValuePairs);
          }
          return questionProxy;
        });

        // build up our user answers into the question proxy object
        // link up system answers into our question
        this.setProperties({
          jobAnswerSet: jobAnswerSet,
          questionProxies: questionProxies
        });
      });
  }
});
