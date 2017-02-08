import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
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

testRelationship('dds-resource', {key: 'project', kind: 'belongsTo', type: 'dds-project'});
