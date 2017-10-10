import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import BaseUserStub from '../../helpers/user-stub'

const mockUser = Ember.Object.create({
  id: 3,
  username: 'link'
});

const UserStub = BaseUserStub.extend({
  user: mockUser
});

moduleForComponent('job-detail-body', 'Unit | Component | job detail body', {
  unit: true,
  beforeEach() {
    this.register('service:user', UserStub);
  }
});

test('it resolves currentUser() from user service', function(assert) {
  const job = Ember.Object.create({});
  let component = this.subject({job: job});
  this.render();
  assert.equal(component.get('currentUser'), mockUser);
});
