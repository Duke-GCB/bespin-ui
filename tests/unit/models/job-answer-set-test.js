import { Promise } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | job answer set', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-answer-set'));
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
    this.owner.lookup('service:store').set('adapterFor', (modelName) => {
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
    this.owner.lookup('service:store').set('pushPayload', (modelName, data) => {
      assert.equal(data.jobs.id, 'newJobId', 'it calls push payload with the result of the createJob promise');
      assert.equal(modelName, 'job', 'it calls pushPayload with job as the model name');
    });
    this.owner.lookup('service:store').set('peekRecord', (modelName, id) => {
      assert.equal(modelName, 'job', 'After pushing payload, peeks at store for a job');
      assert.equal(id, 'newJobId', 'After pushing payload, peeks at store for job with id newJobId');
      return {id: id, type: modelName};
    });
    let model = run(() => this.owner.lookup('service:store').createRecord('job-answer-set'));
    model.set('id', 'answerSetId');
    model.createJob().then(() => {
      done();
    });
  });

  test('it defaults userJobOrder to an empty object', function (assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-answer-set'));
    assert.deepEqual(model.get('userJobOrderJson'), {});
  });
});
