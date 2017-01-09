import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-resource-tree', 'Integration | Component | dds/dds resource tree', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dds/dds-resource-tree}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-resource-tree}}
      template block text
    {{/dds/dds-resource-tree}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
