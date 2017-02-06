import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/question-row', 'Integration | Component | questionnaire/question row', {
  integration: true
});

test('it renders', function(assert) {
  let questionProxy = Ember.Object.create({
    question: { name: 'Question 1' }
  });
  this.set('questionProxy', questionProxy);
  this.render(hbs`{{questionnaire/question-row questionProxy}}`);
  assert.equal(this.$('.question-name').text().trim(), 'Question 1');
});
