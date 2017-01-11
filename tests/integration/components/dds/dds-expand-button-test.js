import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-expand-button', 'Integration | Component | dds/dds expand button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-expand-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-expand-button}}
      template block text
    {{/dds/dds-expand-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
