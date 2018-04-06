import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('faqs/faq-item', 'Integration | Component | faqs/faq item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{faqs/faq-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#faqs/faq-item}}
      template block text
    {{/faqs/faq-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
