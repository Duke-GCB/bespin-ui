import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | visit routes requiring login', function(hooks) {
  setupApplicationTest(hooks);
  test('visiting /jobs requires login', async function(assert) {
    await visit('/jobs');
    assert.equal(currentURL(), '/login');
  });
  test('visiting /workflows requires login', async function(assert) {
    await visit('/workflows');
    assert.equal(currentURL(), '/login');
  });
  test('visiting /settings requires login', async function(assert) {
    await visit('/settings');
    assert.equal(currentURL(), '/login');
  });
});
