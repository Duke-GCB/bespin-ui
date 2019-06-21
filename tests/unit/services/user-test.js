import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const UserStoreStub = EmberObject.extend({
  queryRecord(modelName) {
    return resolve({
      modelName: modelName,
      username: 'abc123'
    });
  }
});

module('Unit | Service | user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', UserStoreStub);
    this.store = this.owner.lookup('service:store');
  });

  test('it queries users/current-user from the store', function(assert) {
    assert.expect(3);
    let service = this.owner.lookup('service:user');
    assert.ok(service);
    service.currentUser().then(function(user) {
      assert.equal(user.modelName, 'user');
      assert.equal(user.username, 'abc123');
    });
  });
});
