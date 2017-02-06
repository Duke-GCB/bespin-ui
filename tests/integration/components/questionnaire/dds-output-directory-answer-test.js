import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/dds-output-directory-answer', 'Integration | Component | questionnaire/dds output directory answer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-output-directory-answer}}`);
  assert.ok(this.$().text());
});
