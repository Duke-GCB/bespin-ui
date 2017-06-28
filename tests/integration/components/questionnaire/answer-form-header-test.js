import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answer-form-header', 'Integration | Component | questionnaire/answer form header', {
  integration: true
});

test('it renders', function(assert) {
  this.set('questionnaire', {name: 'Header Title', description: 'Header Subtitle'});
  this.render(hbs`{{questionnaire/answer-form-header questionnaire}}`);

  assert.equal(this.$('h2').text().trim(), 'Header Title');
  assert.equal(this.$('h4').text().trim(), 'Header Subtitle');
});
