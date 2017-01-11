import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-file-checkbox', 'Integration | Component | dds/dds file checkbox', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-file-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-file-checkbox}}
      template block text
    {{/dds/dds-file-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
