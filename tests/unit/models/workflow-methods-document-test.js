import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

module('Unit | Model | workflow methods document', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('workflow-methods-document'));
    // let store = this.store();
    assert.ok(!!model);
  });

  testRelationship('workflow-methods-document', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});

  test('it has contents alias field content', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('workflow-methods-document'));
    run(() => {model.set('content', 'somevalue')});
    assert.equal('somevalue', model.get('content'));
    assert.equal('somevalue', model.get('contents'));
  });
});
