import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

const UserStoreStub = EmberObject.extend({
  queryRecord(modelName) {
    return resolve({
      modelName: modelName,
      username: 'abc123'
    });
  }
});

moduleFor('service:user', 'Unit | Service | user', {
  needs: ['model:user'],
  beforeEach() {
    this.register('service:store', UserStoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

test('it queries users/current-user from the store', function(assert) {
  assert.expect(3);
  let service = this.subject();
  assert.ok(service);
  service.currentUser().then(function(user) {
    assert.equal(user.modelName, 'user');
    assert.equal(user.username, 'abc123');
  });
});
