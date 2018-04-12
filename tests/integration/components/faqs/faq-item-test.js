import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('faqs/faq-item', 'Integration | Component | faqs/faq item', {
  integration: true
});

test('it renders', function(assert) {
  const faq = Ember.Object.create({
    question: 'How many bits are in a byte?',
    answer: 'There are 8 bits in a byte.'
  });

  this.set('faq', faq);
  this.render(hbs`{{faqs/faq-item faq}}`);

  assert.equal(this.$('.faq-item-question').text().trim(), 'How many bits are in a byte?');
  assert.equal(this.$('.faq-item-answer').text().trim(), 'There are 8 bits in a byte.');
});
