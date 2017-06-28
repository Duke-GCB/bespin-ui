import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/empty-selection', 'Integration | Component | questionnaire/empty selection', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/empty-selection}}`);
  assert.equal(this.$().text().trim(), 'None selected');
});
