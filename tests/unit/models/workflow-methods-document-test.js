import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow-methods-document', 'Unit | Model | workflow methods document', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow-methods-document', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});
