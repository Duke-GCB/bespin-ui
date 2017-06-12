import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
import Ember from 'ember';

moduleForModel('job', 'Unit | Model | job', {
  // Specify the other units that are required for this test.
  needs: [
    'model:workflow-version',
    'model:job-output-dir',
    'model:job-error',
    'model:job-file-stage-group'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes isFinished', function(assert) {
  let job = this.subject();
  Ember.run(() => {
    job.set('state', 'S');
    assert.notOk(job.get('isFinished'));
    job.set('state', 'F');
    assert.ok(job.get('isFinished'));
  });
});

test('it computes isNew', function(assert) {
  let job = this.subject();
  Ember.run(() => {
    job.set('state', 'F');
    assert.notOk(job.get('isNew'));
    job.set('state', 'N');
    assert.ok(job.get('isNew'));
  });
});

testRelationship('job', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});
testRelationship('job', {key: 'outputDir', kind: 'belongsTo', type: 'job-output-dir'});
testRelationship('job', {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'});

test('it sends actions to the adapter', function(assert) {
  assert.expect(15); // 5asserts for each action
  this.store().set('adapterFor', (modelName) => {
    return {
      start(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'startId', 'should call adapter.start() with id');
        return Ember.RSVP.resolve({id: id, state: 'S'}); // Starting
      },
      cancel(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'cancelId', 'should call adapter.cancel() with id');
        return Ember.RSVP.resolve({id: id, state: 'c'}); // canceling
      },
      restart(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'restartId', 'should call adapter.restart() with id');
        return Ember.RSVP.resolve({id: id, state: 'r'}); // restarting
      }
    };
  });
  this.store().set('peekRecord', (modelName) => {
    assert.equal(modelName, 'job');
  });
  let stubPushPayloadStart = (modelName, data) => {
    // Returns nothing
    assert.equal(modelName, 'job');
    assert.equal(data.state, 'S', 'should push a payload with starting state');
  };

  let stubPushPayloadCancel = (modelName, data) => {
    // Returns nothing
    assert.equal(modelName, 'job');
    assert.equal(data.state, 'c', 'should push a payload with canceling state');
  };

  let stubPushPayloadRestart = (modelName, data) => {
    // Returns nothing
    assert.equal(modelName, 'job');
    assert.equal(data.state, 'r', 'should push a payload with restarting state');
  };

  // Since each one is asynchronous but must be synchronized with the pushPayload function,
  // these tests are run in 3 sequential Ember.run loops

  let store = this.store();
  Ember.run(() => {
    store.set('pushPayload', stubPushPayloadStart);
    let model = this.subject();
    model.set('id', 'startId');
    model.start();
  });

  Ember.run(() => {
    store.set('pushPayload', stubPushPayloadCancel);
    let model = this.subject();
    model.set('id', 'cancelId');
    model.cancel();
  });

  Ember.run(() => {
    store.set('pushPayload', stubPushPayloadRestart);
    let model = this.subject();
    model.set('id', 'restartId');
    model.restart();
  });
});
