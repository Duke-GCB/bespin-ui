import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('faqs/faq-heading', 'Integration | Component | faqs/faq heading', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{faqs/faq-heading}}`);
  assert.equal(this.$('.faq-heading').text().trim().indexOf('Bespin: Frequently Asked Questions'), 0);
});
