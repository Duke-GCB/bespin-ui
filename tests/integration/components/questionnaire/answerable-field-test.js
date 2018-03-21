import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answerable-field', 'Integration | Component | questionnaire/answerable field', {
  integration: true
});

test('it renders nothing', function(assert) {
  this.render(hbs`{{questionnaire/answerable-field}}`);
  assert.equal(this.$().text().trim(), '');
});
