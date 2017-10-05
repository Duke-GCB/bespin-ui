import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  needs: []
});

test('it exists', function(assert) {
  // Not much to test here yet - no relationships or computed properties yet
  let model = this.subject();
  assert.ok(!!model);
});
