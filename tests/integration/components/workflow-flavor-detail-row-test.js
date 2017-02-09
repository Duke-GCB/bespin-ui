import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-flavor-detail-row', 'Integration | Component | workflow flavor detail row', {
  integration: true
});

test('it renders', function(assert) {
  this.set('questionnaire', {'questions': [1,2,3]});
  this.render(hbs`{{workflow-flavor-detail-row questionnaire}}`);
  assert.equal(this.$().text().trim(), 'Has 3 questions');
});
