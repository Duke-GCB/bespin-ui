import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-project-files-picker', 'Integration | Component | dds/dds project files picker', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`{{dds/dds-project-files-picker}}`);
  assert.ok(this.$().text().trim());
});
