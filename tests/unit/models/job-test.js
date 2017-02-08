import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('job', 'Unit | Model | job', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('job', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});

test('it sends actions to the adapter', function(assert) {
  assert.expect(6); // Two asserts for each action
  this.store().set('adapterFor', (modelName) => {
    return {
      start(id) {
        assert.equal(modelName, 'job');
        assert.equal(id, 'startId', 'should call adapter.start() with id');
      },
      cancel(id) {
        assert.equal(modelName, 'job');
        assert.equal(id, 'cancelId', 'should call adapter.cancel() with id');
      },
      restart(id) {
        assert.equal(modelName, 'job');
        assert.equal(id, 'restartId', 'should call adapter.restart() with id');
      }
    };
  });
  let model = this.subject();
  model.set('id', 'startId');
  model.start();
  model.set('id', 'cancelId');
  model.cancel();
  model.set('id', 'restartId');
  model.restart();
});
