import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/exomeseq-studytype-choice', 'Unit | Component | questionnaire/exomeseq studytype choice', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it sets component-specific error text to answerFormErrors', function(assert) {
  const expectedErrorText = 'Please choose a study type';
  const mockAnswerFormErrors = Ember.Object.create({
    fieldName: null,
    errorText: null,
    setError(fieldName, text) {
      this.set('fieldName', fieldName);
      this.set('errorText', text);
    }
  });
  let component = this.subject();
  component.set('answerFormErrors', mockAnswerFormErrors);
  assert.equal(mockAnswerFormErrors.get('errorText'), expectedErrorText);
});

