import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/string-field', 'Unit | Component | questionnaire/string field', {
  unit: true
});

test('it records error with empty string', function(assert) {
  assert.expect(2);
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'string-field1');
      assert.equal(errorText, 'Please enter a value for this field.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'string-field1',
    stringValue: '',
    answerFormErrors: mockErrors
  });
});

test('it records no error when everything good', function(assert) {
  assert.expect(1);
  const mockErrors = Ember.Object.create({
    setError(/* fieldName, errorText */) {
      assert.notOk(true); // Should not call this!
    },
    clearError(fieldName) {
      assert.equal(fieldName, 'string-field2');
    }
  });

  this.subject({
    fieldName: 'string-field2',
    stringValue: 'Something',
    answerFormErrors: mockErrors
  });
});

test('it computes an answer object from the fieldName and value', function(assert) {
  const fieldName = 'field3';
  const stringField = this.subject();
  assert.notOk(stringField.get('answer').get(fieldName));
  stringField.set('fieldName',fieldName);
  assert.notOk(stringField.get('answer').get(fieldName));
  stringField.set('stringValue','value123');
  assert.equal(stringField.get('answer').get('field3'), 'value123');
});
