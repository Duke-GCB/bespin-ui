import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('questionnaire/int-field', 'Unit | Component | questionnaire/int field', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it sets notIntegerText error for non-integer decimal values', function(assert) {
  assert.expect(2);
  const mockErrors = EmberObject.create({
    setError( fieldName, errorText ) {
      assert.equal(fieldName, 'somefield');
      assert.equal(errorText, 'Please enter an integer value for this field.');
    },
    clearError() {
      assert.notOk(true); // Should not call this!
    }
  });

  // Creates the component instance
  this.subject({
    fieldName: 'somefield',
    answerChanged: ()=>{},
    answerValue: '1.1',
    answerFormErrors: mockErrors
  });
});

test('it sets invalidErrorText error for alpha values', function(assert) {
  assert.expect(2);
  const mockErrors = EmberObject.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'somefield'); // Should not call this!
      assert.equal(errorText, 'Please enter an integer value for this field.'); // Should not call this!
    },
    clearError() {
      assert.notOk(true); // Should not call this!
    }
  });

  // Creates the component instance
  this.subject({
    fieldName: 'somefield',
    answerChanged: ()=>{},
    answerValue: 'abc',
    answerFormErrors: mockErrors
  });
});

test('it clears form error for integer values', function(assert) {
  assert.expect(1);
  const mockErrors = EmberObject.create({
    setError() {
      assert.notOk(true); // Should not call this!
    },
    clearError(fieldName) {
      assert.equal(fieldName, 'somefield'); // Should not call this!
    }
  });

  // Creates the component instance
  this.subject({
    fieldName: 'somefield',
    answerChanged: ()=>{},
    answerValue: '1',
    answerFormErrors: mockErrors
  });
});
