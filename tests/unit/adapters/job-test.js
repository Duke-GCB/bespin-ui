import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:job', 'Unit | Adapter | job', {
  needs: ['service:session'],
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it POSTS the start action', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, '/jobs/3/start/');
    assert.equal(method, 'POST');
  });
  adapter.start(3);
});

test('it POSTS the restart action', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, '/jobs/35/restart/');
    assert.equal(method, 'POST');
  });
  adapter.restart(35);
});

test('it POSTS the cancel action', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, '/jobs/7/cancel/');
    assert.equal(method, 'POST');
  });
  adapter.cancel(7);
});

test('it POSTS the authorize action with token', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method, params) => {
    assert.equal(url, '/jobs/843/authorize/');
    assert.equal(method, 'POST');
    assert.deepEqual(params, {'data': 'auth-token'});
  });
  adapter.authorizeJob(843, 'auth-token');
});
