import Ember from 'ember';

const QuestionProxy = Ember.Object.extend({
  question: null,
  systemAnswerValuePairs: [],
  userAnswerValuePairs: [],
  userJobAnswers: Ember.computed('userAnswerValuePairs.[]', function() {
    return this.get('userAnswerValuePairs').mapBy('jobAnswer');
  }),
  readOnly: Ember.computed('systemAnswerValuePairs.length', function() {
    return this.get('systemAnswerValuePairs.length') > 0;
  }),

  save() {
    // promises to save everything
    let promises = this.get('userAnswerValuePairs').map(answerValuePair => {
      return answerValuePair.save();
    });
    return Ember.RSVP.all(promises);
  }
});

const AnswerValuePair = Ember.Object.extend({
  jobAnswer: null,
  jobAnswerValue: null,
  save() {
    return this.get('jobAnswer').save().then(saved => {
      return this.get('jobAnswerValue').save();
    })
  }
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
    let questions = questionnaire.get('questions');
    let systemJobAnswers = store.query('job-answer', {questionnaire: questionnaire.get('id')});
    let jobAnswerSet = Ember.RSVP.resolve(store.createRecord('job-answer-set', {questionnaire: questionnaire}));

    let promises = {
      questions: questions,
      jobAnswerSet: jobAnswerSet,
      systemJobAnswers: systemJobAnswers
    };
    Ember.RSVP.hash(promises).then(resolved => {
      const jobStringAnswers = store.query('job-string-answer', {answers: resolved.systemJobAnswers.mapBy('id')});
      const jobDDSFileAnswers = store.query('job-dds-file-answer', {answers: resolved.systemJobAnswers.mapBy('id')});

      // Carry forward stuff we already have
      let promises = {
        questions: resolved.questions,
        jobAnswerSet: resolved.jobAnswerSet,
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
            let jobAnswerValue = jobStringAnswers.findBy('answer.id', questionSystemAnswer.get('id'));
            let systemAnswerValuePair = AnswerValuePair.create({
              jobAnswer: questionSystemAnswer,
              jobAnswerValue: jobAnswerValue
            });
            return systemAnswerValuePair;
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
            let jobAnswerValue = store.createRecord(question.get('modelForUserAnswerValue'), {
              answer: jobAnswer
            });
            let userAnswerValuePair = AnswerValuePair.create({
              jobAnswer: jobAnswer,
              jobAnswerValue: jobAnswerValue
            });
            userAnswerValuePairs.push(userAnswerValuePair);
          }
          questionProxy.set('userAnswerValuePairs', userAnswerValuePairs);
        }
        return questionProxy;
      });

      // The job-answer-set needs a collection of user job-answers
      let userJobAnswers = [];
      questionProxies.mapBy('userAnswerValuePairs').forEach(array => {
        array.forEach(userAnswerValuePair => {
          userJobAnswers.push(userAnswerValuePair.get('jobAnswer'));
        });
      });
      jobAnswerSet.set('answers', userJobAnswers);
      this.setProperties({
        jobAnswerSet: jobAnswerSet,
        questionProxies: questionProxies
      });
    });
  },
  /*
    Saving ultimately saves the job-answer-set
    But, since the job-answer-set contains job-answers, we must save them (and their values) first
   */
  save() {

    let questionProxies = this.get('questionProxies');
    let promises = questionProxies.map(questionProxy => {
      return questionProxy.save();
    });
    let jobAnswerSet = this.get('jobAnswerSet');
    return Ember.RSVP.all(promises).then(() => {
      return jobAnswerSet.save();
    });
  }
});
