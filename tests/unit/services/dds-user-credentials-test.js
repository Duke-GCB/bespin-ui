import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import StoreStub from '../../helpers/store-stub';

module('Unit | Service | dds user credentials', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
    this.store = this.owner.lookup('service:store');
  });

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:dds-user-credentials');
    assert.ok(service);
  });

  // Todo: Test the promise resolving, but the service doesn't report when that happens
});
