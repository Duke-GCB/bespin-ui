import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('faqs/faq-list', 'Integration | Component | faqs/faq list', {
  integration: true
});

test('it renders a faq-heading', function(assert) {
  this.render(hbs`{{faqs/faq-list}}`);
  assert.equal(this.$('.faq-heading').length, 1);
});

test('it renders an item for each faq', function(assert) {
  const faqs = [
    { question: 'q1', answer: 'a1' },
    { question: 'q2', answer: 'a2' },
    { question: 'q3', answer: 'a3' }
  ];
  this.set('faqs', faqs);
  this.render(hbs`{{faqs/faq-list faqs=faqs}}`);
  assert.equal(this.$('.faq-item').length, 3);
});
