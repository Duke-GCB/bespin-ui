import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import BaseUserStub from '../../helpers/user-stub'

const mockUser = EmberObject.create({
  id: 3,
  username: 'link'
});

const UserStub = BaseUserStub.extend({
  user: mockUser
});

module('Unit | Component | job detail body', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:user', UserStub);
  });

  test('it resolves currentUser() from user service', function(assert) {
    const job = EmberObject.create({});
    let component = this.owner.factoryFor('component:job-detail-body').create({job: job});
    this.render();
    assert.equal(component.get('currentUser'), mockUser);
  });
});
