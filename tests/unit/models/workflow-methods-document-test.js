import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow-methods-document', 'Unit | Model | workflow methods document', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow-methods-document', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});

test('it has contents alias field content', function(assert) {
  let model = this.subject();
  run(() => {model.set('content', 'somevalue')});
  assert.equal('somevalue', model.get('content'));
  assert.equal('somevalue', model.get('contents'));
});
