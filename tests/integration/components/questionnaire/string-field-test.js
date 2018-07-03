import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/string-field', 'Integration | Component | questionnaire/string field', {
  integration: true
});

test('it renders', function(assert) {
  this.set('fieldName', 'field');
  this.set('label', 'SomeLabel');
  this.render(hbs`{{questionnaire/string-field fieldName label}}`);
  assert.equal(this.$().text().trim(), 'SomeLabel');
});

test('it shows/hides errors based on answerFormErrors.show', function(assert) {
  this.set('fieldName', 'field-name');
  this.set('answerFormErrors', Ember.Object.create({
    show: true,
    errors: [{field: 'field-name', message: 'Error Message'}],
    setError() { }
  }));
    this.render(hbs`{{questionnaire/string-field fieldName=fieldName answerFormErrors=answerFormErrors}}`);
  assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

  this.set('answerFormErrors.show', false);
    this.render(hbs`{{questionnaire/string-field fieldName=fieldName answerFormErrors=answerFormErrors}}`);
  assert.equal(this.$('.error-panel').text().trim(), '');
});

test('it correctly observes error array', function(assert) {
  const errors = Ember.Object.create({
    show: true,
    errors: [{field: 'field-name', message: 'Empty'}],
    setError() { }
  });
  this.set('answerFormErrors', errors);
  this.set('fieldName', 'field-name');
  Ember.run(() => {
    // Initially empty
    this.render(hbs`{{questionnaire/string-field fieldName=fieldName answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Empty');

    // Now replace the errors and verify the new error is displayed
    this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
    assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
  });
});
