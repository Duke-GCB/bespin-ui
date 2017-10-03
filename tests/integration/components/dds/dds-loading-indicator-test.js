import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-loading-indicator', 'Integration | Component | dds/dds loading indicator', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{#dds/dds-loading-indicator}}Loading...{{/dds/dds-loading-indicator}}`);
  assert.equal(this.$().text().trim(), 'Loading...');
});
