import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:get-token', 'Unit | Controller | get token', {
  needs: ['service:session']
});

const MockSession = EmberObject.extend({
  isAuthenticated: false,
  authenticate() { return resolve(); }
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
