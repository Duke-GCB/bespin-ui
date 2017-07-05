import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it invalidates sessions', function(assert) {
  assert.expect(1); // Expect one assertion
  let controller = this.subject();
  // Simple "mock" that has an invalidate method. Other good example of stub in login-test.js
  controller.set('session', { invalidate() { assert.ok(true);}});
  controller.send('invalidateSession');
});
