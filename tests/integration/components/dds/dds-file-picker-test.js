import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-file-picker', 'Integration | Component | dds/dds file picker', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{dds/dds-file-picker}}`);
  assert.ok(this.$().text());

});
