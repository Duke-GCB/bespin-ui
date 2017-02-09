import { moduleFor, test } from 'ember-qunit';
import StoreStub from '../../helpers/store-stub';

moduleFor('service:dds-user-credentials', 'Unit | Service | dds user credentials', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-user-credential'],
  beforeEach() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

// Todo: Test the promise resolving, but the service doesn't report when that happens
