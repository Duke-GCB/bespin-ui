import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-project-files-picker', 'Integration | Component | dds/dds project files picker', {
  integration: true
});

test('it renders two form groups', function(assert) {
  this.render(hbs`{{dds/dds-project-files-picker}}`);
  assert.equal(this.$('.form-group').length, 2);
});
