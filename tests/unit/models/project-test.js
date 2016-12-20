import { moduleForModel, test } from 'ember-qunit';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  // Not much to test in project model yet
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
