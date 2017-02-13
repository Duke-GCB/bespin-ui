import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-flavor-detail-row', 'Integration | Component | workflow flavor detail row', {
  integration: true
});

test('it renders', function(assert) {
  this.set('questionnaire', {description: 'Questionnaire Description'});
  this.render(hbs`{{workflow-flavor-detail-row questionnaire}}`);
  assert.equal(this.$().text().trim(), 'Questionnaire Description');
});
