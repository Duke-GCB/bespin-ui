import { Promise } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

/*
TEST
 jobName: DS.attr('string'),
 userJobOrder: DS.attr('string'), // This is JSON.

 */
moduleForModel('job-answer-set', 'Unit | Model | job answer set', {
  // Specify the other units that are required for this test.
  needs: ['model:job-questionnaire', 'model:job-file-stage-group']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'questionnaire', kind: 'belongsTo', type: 'job-questionnaire'},
  {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'}
];

testRelationships('job-answer-set', testRels);

test('it sends create-job action to the adapter', function(assert) {
  assert.expect(6);
  let done = assert.async();
  this.store().set('adapterFor', (modelName) => {
    return EmberObject.create({
      createJob(id) {
        assert.equal(modelName, 'job-answer-set');
        assert.equal(id, 'answerSetId', 'should call adapter.createJob() with id');
        return new Promise((resolve) => {
          resolve({jobs: {id: 'newJobId'}});
        });
      }
    });
  });
  this.store().set('pushPayload', (modelName, data) => {
    assert.equal(data.jobs.id, 'newJobId', 'it calls push payload with the result of the createJob promise');
    assert.equal(modelName, 'job', 'it calls pushPayload with job as the model name');
  });
  this.store().set('peekRecord', (modelName, id) => {
    assert.equal(modelName, 'job', 'After pushing payload, peeks at store for a job');
    assert.equal(id, 'newJobId', 'After pushing payload, peeks at store for job with id newJobId');
    return {id: id, type: modelName};
  });
  let model = this.subject();
  model.set('id', 'answerSetId');
  model.createJob().then(() => {
    done();
  });
});

test('it defaults userJobOrder to an empty object', function (assert) {
  let model = this.subject();
  assert.deepEqual(model.get('userJobOrderJson'), {});
});
