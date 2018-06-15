import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:get-token', 'Unit | Controller | get token', {
  needs: ['service:session']
});

const MockSession = Ember.Object.extend({
  isAuthenticated: false,
  authenticate() { return Ember.RSVP.resolve(); }
});

test('it exists', function(assert) {
  let controller = this.subject({
    session: MockSession.create(),
    transitionToRoute() {}
  });
  assert.ok(controller);
  assert.equal(controller.get('successRoute'), '/');
  assert.equal(controller.get('failureRoute'), '/login');
});
