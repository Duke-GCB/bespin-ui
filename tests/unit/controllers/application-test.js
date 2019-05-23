import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  needs: ['service:session', 'service:user']
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

test('it fetches currentUser when session.isAuthenticated changes', function(assert) {
  assert.expect(4);
  const mockSessionService = EmberObject.create({
    isAuthenticated: false
  });
  const mockUser = EmberObject.create({ id: 6, username: 'samus'});
  const mockUserService = EmberObject.create({
    currentUser() {
      assert.ok(true); // Ensure this is called
      return resolve(mockUser);
    }
  });
  let controller = this.subject({
    session: mockSessionService,
    user: mockUserService
  });

  // In one run loop, set isAuthenticated = true
  run(() => {
    assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
    mockSessionService.set('isAuthenticated', true);
  });

  // In the next, assert that the current User updated. Then clear authentication
  run(() => {
    assert.equal(controller.get('currentUser'), mockUser); // currentUser should be fetched when session is authenticated
    mockSessionService.set('isAuthenticated', false);
  });

  // Finally, assert that currentUser is null again
  run(() => {
    assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
  });

});
