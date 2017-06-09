import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answer-form-header', 'Integration | Component | questionnaire/answer form header', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/answer-form-header title='Header Title'}}`);

  assert.equal(this.$().text().trim(), 'Header Title');
});
