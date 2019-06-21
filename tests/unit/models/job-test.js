import { resolve } from 'rsvp';
import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('job', 'Unit | Model | job', {
  // Specify the other units that are required for this test.
  needs: [
    'model:workflow-version',
    'model:job-dds-output-project',
    'model:job-error',
    'model:job-file-stage-group',
    'model:share-group'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes job state properties', function(assert) {
  assert.expect(27);
  const statesAndProperties = [
    ['N', 'isNew'],
    ['A', 'isAuthorized'],
    ['S', 'isStarting'],
    ['r', 'isRestarting'],
    ['R', 'isRunning'],
    ['F', 'isFinished'],
    ['E', 'isErrored'],
    ['c', 'isCanceling'],
    ['C', 'isCanceled'],
  ];
  let job = this.subject();
  run(() => {
    statesAndProperties.forEach(function(stateAndProperty) {
      const state = stateAndProperty[0];
      const property = stateAndProperty[1];
      job.set('state', '');
      assert.notOk(job.get(property), `${property} should be false when empty job.state`);
      job.set('state', state);
      assert.ok(job.get(property), `${property} should be true when job.state == ${state}`);

      // hasAuthorization should be true for any state except new
      if(state === 'N') {
        assert.notOk(job.get('hasAuthorization'), `Job in state ${state} should return false for hasAuthorization`);
      } else {
        assert.ok(job.get('hasAuthorization'), `Job in state ${state} should return true for hasAuthorization`);
      }
    });
  });
});


testRelationship('job', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});
testRelationship('job', {key: 'outputProject', kind: 'belongsTo', type: 'job-dds-output-project'});
testRelationship('job', {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'});
testRelationship('job', {key: 'shareGroup', kind: 'belongsTo', type: 'share-group'});

test('it sends actions to the adapter', function(assert) {
  assert.expect(21); // 5 asserts for each of start/cancel/restart, and 6 for authorize
  this.store().set('adapterFor', (modelName) => {
    return {
      start(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'startId', 'should call adapter.start() with id');
        return resolve({id: id, state: 'S'}); // Starting
      },
      cancel(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'cancelId', 'should call adapter.cancel() with id');
        return resolve({id: id, state: 'c'}); // canceling
      },
      restart(id) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(id, 'restartId', 'should call adapter.restart() with id');
        return resolve({id: id, state: 'r'}); // restarting
      },
      authorizeJob(id, token) {
        assert.equal(modelName, 'job', 'modelName in adapterFor should be job');
        assert.equal(token['job-tokens']['token'], 'authorizeToken', 'should call adapter.authorize() with a job-token object');
        assert.equal(id, 'authorizeId', 'should call adapter.authorizeJob() with id');

        const jobTokensPayload = {
          'job-tokens': {
            'token': 'authorizeToken',
            'job': {
              'id' : id,
              'state': 'A'
            }
          }
        };
        return resolve(jobTokensPayload); // Authorized job wrapped in a job-tokens object
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

  let stubPushPayloadAuthorize = (modelName, data) => {
    // Returns nothing
    assert.equal(modelName, 'job');
    // Authorize endpoint returns a job-token, not a job. Check the state of the job through the relationship
    assert.equal(data.jobs.state, 'A', 'Should push a payload with authorized state');
  };

  // Since each one is asynchronous but must be synchronized with the pushPayload function,
  // these tests are run in 3 sequential Ember.run loops

  let store = this.store();
  run(() => {
    store.set('pushPayload', stubPushPayloadStart);
    let model = this.subject();
    model.set('id', 'startId');
    model.start();
  });

  run(() => {
    store.set('pushPayload', stubPushPayloadCancel);
    let model = this.subject();
    model.set('id', 'cancelId');
    model.cancel();
  });

  run(() => {
    store.set('pushPayload', stubPushPayloadRestart);
    let model = this.subject();
    model.set('id', 'restartId');
    model.restart();
  });

  run(() => {
    store.set('pushPayload', stubPushPayloadAuthorize);
    let model = this.subject();
    model.set('id', 'authorizeId');
    model.authorize('authorizeToken');
  })
});

test('it computes lastJobError by most recently created', function(assert) {
  const store = this.store();
  run(() => {
  const jobErrors = [
    store.createRecord('job-error', {id: 'oldest', created: new Date(0)}),
    store.createRecord('job-error', {id: 'newest', created: new Date(1506370813)}),
    store.createRecord('job-error', {id: 'middle', created: new Date(1000000000)})
  ];
    let job = this.subject();
    job.set('jobErrors', jobErrors);
    assert.equal(job.get('lastJobError.id'), 'newest');
  });
});

test('it computes isDeletable', function(assert) {
  const statesAndDeletable = [
    ['N', true],
    ['A', true],
    ['S', false],
    ['r', false],
    ['R', false],
    ['F', true],
    ['E', true],
    ['c', false],
    ['C', true],
  ];
  assert.expect(statesAndDeletable.length);
  let job = this.subject();
  run(() => {
    statesAndDeletable.forEach(function (stateAndDeletable) {
      const state = stateAndDeletable[0];
      const deletable = stateAndDeletable[1];
      job.set('state', state);
      if (deletable) {
        assert.ok(job.get('isDeletable'), `Job in state ${state} should be deletable`);
      } else {
        assert.notOk(job.get('isDeletable'), `Job in state ${state} should not be deletable`);
      }
    });
  });
});

test('it contains getLiveUsage', function(assert) {
  assert.expect(3);
  const usage = {
    cpuHours: 1.0,
    vmHours: 4.0,
  };
  const job = this.subject({id: 123});
  this.store().set('adapterFor', (modelName) => {
    assert.equal(modelName, 'job');
    return {
      getLiveUsage(jobId) {
        assert.equal(jobId, 123);
        return usage;
      }
    }
  });
  assert.equal(job.getLiveUsage(), usage);
});
