import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | faqs', function(hooks) {
  setupApplicationTest(hooks);
  test('visiting /faqs requires no login', async function(assert) {
    await visit('/faqs');
    assert.equal(currentURL(), '/faqs');
    assert.equal(find('h3').innerHTML, 'Bespin: Frequently Asked Questions');
  });
});
