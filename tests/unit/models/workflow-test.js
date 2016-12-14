import { moduleForModel, test } from 'ember-qunit';

moduleForModel('workflow', 'Unit | Model | workflow', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
