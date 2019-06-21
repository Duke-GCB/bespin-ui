import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | user', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:user');
    assert.ok(adapter);
  });

  test('it returns current-user url for queryRecord', function(assert) {
    let adapter = this.owner.lookup('adapter:user');
    let url = adapter.urlForQueryRecord({}, 'user');
    assert.equal(url, '/users/current-user/')
  });
});
