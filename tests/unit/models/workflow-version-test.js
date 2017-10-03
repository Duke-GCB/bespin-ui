import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow-version', 'Unit | Model | workflow version', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow', 'model:job', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow-version', {key: 'workflow', kind: 'belongsTo', type: 'workflow'});
testRelationship('workflow-version', {key: 'methodsDocument', kind: 'belongsTo', type: 'workflow-methods-document'});
