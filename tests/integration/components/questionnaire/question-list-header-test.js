import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/question-list-header', 'Integration | Component | questionnaire/question list header', {
  integration: true
});

test('it renders one h3', function(assert) {
  this.render(hbs`{{questionnaire/question-list-header}}`);
  assert.equal(this.$('h3').length, 1);
});
