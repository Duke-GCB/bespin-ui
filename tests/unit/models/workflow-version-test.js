import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('workflow-version', 'Unit | Model | workflow version', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow', 'model:job']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it belongs to a workflow', function(assert) {
  const WorkflowVersion = this.store().modelFor('workflow-version');
  const relationship = Ember.get(WorkflowVersion, 'relationshipsByName').get('workflow');
  assert.equal(relationship.key, 'workflow', 'has relationship with workflow-version');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'workflow', 'Type of related object is workflow');
});
