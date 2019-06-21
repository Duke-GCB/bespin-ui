import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | questionnaire/exomeseq studytype choice', function(hooks) {
  setupTest(hooks);

  test('it sets component-specific error text to answerFormErrors', function(assert) {
    const expectedErrorText = 'Please choose a study type';
    const mockAnswerFormErrors = EmberObject.create({
      fieldName: null,
      errorText: null,
      setError(fieldName, text) {
        this.set('fieldName', fieldName);
        this.set('errorText', text);
      }
    });
    let component = this.owner.factoryFor('component:questionnaire/exomeseq-studytype-choice').create({
      fieldName: 'somefield',
      answerChanged: ()=>{},
    });
    component.set('answerFormErrors', mockAnswerFormErrors);
    assert.equal(mockAnswerFormErrors.get('errorText'), expectedErrorText);
  });
});

