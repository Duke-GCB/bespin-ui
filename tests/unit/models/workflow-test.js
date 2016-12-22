import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('workflow', 'Unit | Model | workflow', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version', 'model:job']
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

test('it computes latest version', function(assert) {
  let workflow = this.subject();
  Ember.run(() => {
    this.store().createRecord('workflow-version', {
      version: 1,
      workflow:workflow
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 1);
  assert.equal(workflow.get('versions').get('length'), 1);
  Ember.run(() => {
    this.store().createRecord('workflow-version', {
      version: 2,
      workflow:workflow
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 2);
  assert.equal(workflow.get('versions').get('length'), 2);
});
