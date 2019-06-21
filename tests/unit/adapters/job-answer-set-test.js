import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | job answer set', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:job-answer-set');
    assert.ok(adapter);
  });

  test('it POSTS the create-job action', function(assert) {
    let adapter = this.owner.lookup('adapter:job-answer-set');
    adapter.set('ajax', (url, method) => {
      assert.equal(url, '/job-answer-sets/87/create-job/');
      assert.equal(method, 'POST');
    });
    adapter.createJob(87);
  });
});
