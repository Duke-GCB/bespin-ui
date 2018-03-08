import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/exomeseq-studytype-choice', 'Integration | Component | questionnaire/exomeseq studytype choice', {
  integration: true
});

test('it renders heading label', function(assert) {
  this.render(hbs`{{questionnaire/exomeseq-studytype-choice}}`);
  assert.equal(this.$('.study-type.heading').text().trim(), 'Choose the type of your study:');
});

test('it renders choices with descriptions', function(assert) {
  this.render(hbs`{{questionnaire/exomeseq-studytype-choice}}`);
  assert.equal(this.$('.study-type.choice').eq(0).text().trim(), 'Small Familial');
  assert.equal(this.$('.study-type.choice input').eq(0).attr('value'), 'Small Familial');
  assert.equal(this.$('.study-type.choice').eq(1).text().trim(), 'Large Population (Requires 20+ samples)');
  assert.equal(this.$('.study-type.choice input').eq(1).attr('value'), 'Large Population');
});

test('it sends answerChanged when selecting a choice', function(assert) {
  // TODO: TEst this next
  this.render(hbs`{{questionnaire/exomeseq-studytype-choice}}`);

});
