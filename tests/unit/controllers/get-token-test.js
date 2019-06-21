import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | get token', function(hooks) {
  setupTest(hooks);

  const MockSession = EmberObject.extend({
    isAuthenticated: false,
    authenticate() { return resolve(); }
  });

  test('it exists', function(assert) {
    let controller = this.owner.factoryFor('controller:get-token').create({
      session: MockSession.create(),
      transitionToRoute() {}
    });
    assert.ok(controller);
    assert.equal(controller.get('successRoute'), '/');
    assert.equal(controller.get('failureRoute'), '/login');
  });
});
