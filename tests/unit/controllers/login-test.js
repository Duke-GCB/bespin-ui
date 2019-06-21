import { Promise } from 'rsvp';
import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

const sessionStub = Service.extend({
  authenticate() {
    return new Promise((resolve) => { resolve(); });
  }
});

moduleFor('controller:login', 'Unit | Controller | login', {
  beforeEach: function() {
    this.register('service:session', sessionStub);
    this.inject.service('session', {as: 'session'});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles authenticate', function(assert) {
  const controller = this.subject();
  controller.set('identification', 'user123');
  controller.set('password', 'secret');
  controller.send('authenticate');
  assert.notOk(controller.get('errorMessage'));
});
