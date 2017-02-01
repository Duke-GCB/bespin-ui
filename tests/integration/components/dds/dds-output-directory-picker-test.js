import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-output-directory-picker', 'Integration | Component | dds/dds output directory picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dds/dds-output-directory-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-output-directory-picker}}
      template block text
    {{/dds/dds-output-directory-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
