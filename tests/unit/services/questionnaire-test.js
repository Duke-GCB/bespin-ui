import { moduleFor, test } from 'ember-qunit';
import StoreStub from '../../helpers/store-stub';
import Ember from 'ember';

moduleFor('service:questionnaire', 'Unit | Service | questionnaire', {
  beforeEach: function () {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

const testQuestionnaire = Ember.Object.create({
  id: 'qr1',
  questions: [
    Ember.Object.create({id: 'q1', occurs: 1, userAnswerKind: 'string', modelForUserAnswerValue: 'job-string-answer'}),
    Ember.Object.create({id: 'q2', occurs: 3, userAnswerKind: 'dds_file', modelForUserAnswerValue: 'job-dds-file-answer'}),
  ]
});

// Replace this with your real tests.
test('it instantiates a questionnaire util', function(assert) {
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(testQuestionnaire);
  assert.ok(qutil);
});

test('it creates a jobAnswerSet with the provided questionnaire', function(assert) {
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(testQuestionnaire);
  let done = assert.async();
  qutil.load().then(function() {
    assert.equal(qutil.get('jobAnswerSet.questionnaire.id'), 'qr1');
    done();
  });
});

test('it builds question proxies for each question', function(assert) {
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(testQuestionnaire);
  let done = assert.async();
  qutil.load().then(function() {
    assert.equal(qutil.get('questionProxies.length'), 2);
    let proxies = qutil.get('questionProxies');
    assert.equal(proxies[0].get('question'), testQuestionnaire.get('questions')[0]);
    assert.equal(proxies[1].get('question'), testQuestionnaire.get('questions')[1]);
    done();
  });
});

test('it builds a question proxy with filled-in answer-value pairs for system questions', function(assert) {
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(testQuestionnaire);
  // Here we need to override the store query to return nothing for system answers and something for user questions
  qutil.set('store.queryFunction', function(modelName, params) {
    // System answers are tied to a questionnaire, user answers are not
    if(modelName === 'job-answer') {
      let result = Ember.Object.create({
        id: 'answer-id',
        questionnaire: params.questionnaire,
        question: testQuestionnaire.get('questions')[0],
        index: 0
      });
      return [result];
    } else if(modelName === 'job-string-answer') {
      let result = Ember.Object.create({
        id: 'string-answer-id',
        answer:{
          id: 'answer-id'
        },
      });
      return [result];
    } else {
      return [];
    }
  });

  let done = assert.async();
  qutil.load().then(function() {
    let proxy = qutil.get('questionProxies')[0];

    assert.equal(proxy.get('systemAnswerValuePairs.length'), 1, 'should have one system answer value pair');
    assert.equal(proxy.get('userAnswerValuePairs.length'), 0, 'should have zero user answer value pairs');
    assert.ok(proxy.get('readOnly'), 'should be a read-only proxy');

    let answerValuePair = proxy.get('systemAnswerValuePairs')[0];
    assert.equal(answerValuePair.get('jobAnswer.id'), 'answer-id', 'answerValuePair should have fetched job answer');
    assert.equal(answerValuePair.get('jobAnswerValue.id'), 'string-answer-id', 'answerValuePair should have fetched job string answer');

    done();
  });
});

test('it builds a question proxy with empty user answer-value pairs for non-system questions', function(assert) {
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(testQuestionnaire);
  // Here we need to override the store query to return nothing for system answers and something for user questions
  qutil.set('store.queryFunction', function() {
    return []; // Force user answers by never returning anything to system-answer queries
  });

  let done = assert.async();
  qutil.load().then(function() {
    let proxy = qutil.get('questionProxies')[1];

    assert.equal(proxy.get('systemAnswerValuePairs.length'), 0, 'should have zero system answer value pair');
    assert.equal(proxy.get('userAnswerValuePairs.length'), 3, 'should have 3 user answer value pairs');
    assert.notOk(proxy.get('readOnly'), 'should be a read-only proxy');

    for(let i=0;i<3;i++) {
      let answerValuePair = proxy.get('userAnswerValuePairs')[i];
      let jobAnswer = answerValuePair.get('jobAnswer');
      assert.equal(jobAnswer.get('index'), i);
      assert.equal(jobAnswer.get('kind'), 'dds_file');
      assert.equal(jobAnswer.question, proxy.get('question'));

      let jobAnswerValue = answerValuePair.get('jobAnswerValue');
      assert.equal(jobAnswerValue.get('__model_kind'), 'job-dds-file-answer');
      assert.equal(jobAnswerValue.get('answer'), jobAnswer);
    }
    done();
  });

});
