import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/unknown-field', 'Integration | Component | questionnaire/unknown field', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/unknown-field fieldLabel='mylabel'}}`);
  assert.equal(this.$('p').text().trim(), 'ERROR: This control has not been implemented.');
});
