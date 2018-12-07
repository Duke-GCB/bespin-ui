import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/unknown-field', 'Integration | Component | questionnaire/unknown field', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/unknown-field 'field_name1'}}`);
  assert.equal(this.$('label').text().trim(), 'Field Name1');
  assert.equal(this.$('strong').text().trim(), 'Not implemented');
});
