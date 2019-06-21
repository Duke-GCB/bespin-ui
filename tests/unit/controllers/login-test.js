import { Promise } from 'rsvp';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const sessionStub = Service.extend({
  authenticate() {
    return new Promise((resolve) => { resolve(); });
  }
});

module('Unit | Controller | login', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:session', sessionStub);
    this.session = this.owner.lookup('service:session');
  });

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:login');
    assert.ok(controller);
  });

  test('it handles authenticate', function(assert) {
    const controller = this.owner.lookup('controller:login');
    controller.set('identification', 'user123');
    controller.set('password', 'secret');
    controller.send('authenticate');
    assert.notOk(controller.get('errorMessage'));
  });
});
