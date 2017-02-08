import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';
import Ember from 'ember';

moduleForModel('job-answer-set', 'Unit | Model | job answer set', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'questionnaire', kind: 'belongsTo', type: 'job-questionnaire'},
  {key: 'answers', kind: 'hasMany', type: 'job-answer'},
];

testRelationships('job-answer-set', testRels);

test('it has no inverse relationship to job-answers', function(assert) {
  const JobAnswerSet = this.store().modelFor('job-answer-set');
  const relationship = Ember.get(JobAnswerSet, 'relationshipsByName').get('answers');
  assert.equal(relationship.inverse, null, 'No inverse relationship');
});

test('it sends create-job action to the adapter', function(assert) {
  assert.expect(4);
  let done = assert.async();
  this.store().set('adapterFor', (modelName) => {
    return Ember.Object.create({
      createJob(id) {
        assert.equal(modelName, 'job-answer-set');
        assert.equal(id, 'answerSetId', 'should call adapter.createJob() with id');
        return new Ember.RSVP.Promise((resolve) => {
          resolve({id: 'newJobId'});
        });
      }
    });
  });
  this.store().set('pushPayload', (modelName, data) => {
    assert.equal(data.id, 'newJobId', 'it calls push payload with the result of the createJob promise');
    assert.equal(modelName, 'job', 'it calls pushPayload with job as the model name');
    done();
  });
  let model = this.subject();
  model.set('id', 'answerSetId');
  model.createJob();
});
