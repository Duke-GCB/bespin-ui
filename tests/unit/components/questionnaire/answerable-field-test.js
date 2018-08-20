import { moduleForComponent, test } from 'ember-qunit';
import Ember from "ember";

moduleForComponent('questionnaire/answerable-field', 'Unit | Component | questionnaire/answerable field', {
  unit: true
});

test('it records error with empty value', function(assert) {
  assert.expect(2);
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'field1');
      assert.equal(errorText, 'Please enter a value for this field.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'field1',
    answerValue: '',
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
      assert.equal(fieldName, 'field2');
    }
  });

  this.subject({
    fieldName: 'field2',
    answerValue: 'Something',
    answerFormErrors: mockErrors
  });
});

test('it computes an answer object from the fieldName and value', function(assert) {
  const fieldName = 'field3';
  const field = this.subject();
  assert.notOk(field.get('answer').get(fieldName));
  field.set('fieldName',fieldName);
  assert.notOk(field.get('answer').get(fieldName));
  field.set('answerValue','value123');
  assert.equal(field.get('answer').get('field3'), 'value123');
});

test('it computes displayLabel using fieldName with capitalization', function(assert) {
  const fieldName = 'field';
  const field = this.subject({fieldName: fieldName});
  assert.equal(field.get('displayLabel'), 'Field'); // simple capitalization
});

test('it computes displayLabel using fieldLabel with no changes', function(assert) {
  const fieldName = 'field name';
  const fieldLabel = 'field label';
  const field = this.subject({fieldName: fieldName, fieldLabel: fieldLabel});
  assert.equal(field.get('displayLabel'), 'field label');
});

test('it computes answer', function(assert) {
  const fieldName = 'field_A';
  const answerValue = 'answer value 123';
  const field = this.subject({fieldName: fieldName, answerValue: answerValue});
  assert.deepEqual(field.get('answer'), Ember.Object.create({field_A: 'answer value 123'}));
});

test('it filters fieldErrors for errors that match the field of this component', function(assert) {
  const mockAnswerFormErrors = Ember.Object.create({
    errors: [
      {field: 'thisField', error: 'invalid'},
      {field: 'otherField', error: 'specific error'}
    ],
    setError() {}
  });
  const field = this.subject({fieldName: 'thisField', answerFormErrors: mockAnswerFormErrors});
  const errors = field.get('fieldErrors');
  assert.deepEqual(errors, [{field: 'thisField', error: 'invalid'}]);
});
