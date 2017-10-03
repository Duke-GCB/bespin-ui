import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-no-projects', 'Integration | Component | dds/dds no projects', {
  integration: true
});

test('it renders an an alert-danger', function(assert) {
  this.render(hbs`{{dds/dds-no-projects}}`);
  assert.notEqual(this.$('.alert.alert-danger').text().trim(), '');
});
