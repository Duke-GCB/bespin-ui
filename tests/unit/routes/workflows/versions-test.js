import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | workflows/versions', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:workflows/versions');
    assert.ok(route);
  });
});
