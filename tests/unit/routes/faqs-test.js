import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | faqs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:faqs');
    assert.ok(route);
  });
});
