import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('workflow', 'Unit | Model | workflow', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has many workflow-versions', function(assert) {
  const Workflow = this.store().modelFor('workflow');
  const relationship = Ember.get(Workflow, 'relationshipsByName').get('versions');
  assert.equal(relationship.key, 'versions', 'has relationship with workflow-version');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  assert.equal(relationship.type, 'workflow-version', 'Type of related object is workflow-version');
});
