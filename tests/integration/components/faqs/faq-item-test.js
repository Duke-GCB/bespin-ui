import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | faqs/faq item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const faq = EmberObject.create({
      question: 'How many bits are in a byte?',
      answer: 'There are 8 bits in a byte.'
    });

    this.set('faq', faq);
    await render(hbs`{{faqs/faq-item faq}}`);

    assert.equal(this.$('.faq-item-question').text().trim(), 'How many bits are in a byte?');
    assert.equal(this.$('.faq-item-answer').text().trim(), 'There are 8 bits in a byte.');
  });
});
