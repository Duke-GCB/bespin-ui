import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const UserStoreStub = Ember.Object.extend({
  findRecord(modelName, id) {
    return Ember.RSVP.resolve({
      modelName: modelName,
      id: id,
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
  assert.expect(4);
  let service = this.subject();
  assert.ok(service);
  service.currentUser().then(function(user) {
    assert.equal(user.modelName, 'user');
    assert.equal(user.id, 'current-user');
    assert.equal(user.username, 'abc123');
  });
});
