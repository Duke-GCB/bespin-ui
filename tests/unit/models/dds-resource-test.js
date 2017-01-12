import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
moduleForModel('dds-resource', 'Unit | Model | dds resource', {
  needs: ['model:dds-project']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes file kind', function(assert) {
  let model = this.subject();
  Ember.run(() => {model.set('kind', 'dds-file');});
  assert.ok(model.get('isFile'));
  assert.notOk(model.get('isFolder'));
});

test('it computes folder kind', function(assert){
  let model = this.subject();
  Ember.run(() => {model.set('kind', 'dds-folder');});
  assert.ok(model.get('isFolder'));
  assert.notOk(model.get('isFile'));
});

test('it belongs to a dds-project', function(assert) {
  const DDSResource = this.store().modelFor('dds-resource');
  const relationship = Ember.get(DDSResource, 'relationshipsByName').get('project');
  assert.equal(relationship.key, 'project', 'has relationship with dds-project');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'dds-project', 'Type of related object is dds-project');
});
