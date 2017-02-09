import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:job-answer-set', 'Unit | Adapter | job answer set', {
  needs: ['service:session'],
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it POSTS the create-job action', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, '/job-answer-sets/87/create-job/');
    assert.equal(method, 'POST');
  });
  adapter.createJob(87);
});
