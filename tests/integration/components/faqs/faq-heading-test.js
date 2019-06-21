import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faqs/faq heading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{faqs/faq-heading}}`);
    assert.equal(this.$('.faq-heading').text().trim().indexOf('Bespin: Frequently Asked Questions'), 0);
  });
});
