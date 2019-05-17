import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow-version-tool-detail', 'Unit | Model | workflow version tool detail', {
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow-version-tool-detail', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});
