import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | get token', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:get-token');
    assert.ok(route);
  });
});
