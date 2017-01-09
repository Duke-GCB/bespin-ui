import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-file-picker', 'Integration | Component | dds/dds file picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dds/dds-file-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-file-picker}}
      template block text
    {{/dds/dds-file-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
