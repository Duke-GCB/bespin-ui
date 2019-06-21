import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faqs/faq list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a faq-heading', async function(assert) {
    await render(hbs`{{faqs/faq-list}}`);
    assert.equal(this.$('.faq-heading').length, 1);
  });

  test('it renders an item for each faq', async function(assert) {
    const faqs = [
      { question: 'q1', answer: 'a1' },
      { question: 'q2', answer: 'a2' },
      { question: 'q3', answer: 'a3' }
    ];
    this.set('faqs', faqs);
    await render(hbs`{{faqs/faq-list faqs=faqs}}`);
    assert.equal(this.$('.faq-item').length, 3);
  });
});
