import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:application', 'Unit | Route | application', {
  needs: ['service:session','service:user']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets the currentUser on the controller', function(assert) {
  let route = this.subject({
    user: Ember.Object.create({
      currentUser() {
        return Ember.Object.create({id: 6, username: 'abc111'});
      }
    })
  });
  let controller = Ember.Object.create();
  let model = null;
  route.setupController(controller, model);
  assert.equal(controller.get('currentUser.username'), 'abc111');
});
