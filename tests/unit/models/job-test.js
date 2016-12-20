import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job', 'Unit | Model | job', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it belongs to a workflow-version', function(assert) {
  const Job = this.store().modelFor('job');
  const relationship = Ember.get(Job, 'relationshipsByName').get('workflowVersion');
  assert.equal(relationship.key, 'workflowVersion', 'has relationship with workflow-version');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'workflow-version', 'Type of related object is workflow-version');
});
