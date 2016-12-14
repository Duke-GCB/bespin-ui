import { moduleForModel, test } from 'ember-qunit';

moduleForModel('workflow-version', 'Unit | Model | workflow version', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
