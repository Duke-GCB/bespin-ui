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
