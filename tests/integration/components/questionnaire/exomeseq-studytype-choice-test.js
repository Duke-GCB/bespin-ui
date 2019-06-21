import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/exomeseq studytype choice', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders heading label', async function(assert) {
    this.set('answerChanged', ()=>{});
    await render(hbs`{{questionnaire/exomeseq-studytype-choice "fieldName" (action answerChanged) }}`);
    assert.equal(this.$('.study-type.heading').text().trim(), 'Choose the type of your study:');
  });

  test('it renders choices with descriptions', async function(assert) {
    this.set('answerChanged', ()=>{});
    await render(hbs`{{questionnaire/exomeseq-studytype-choice "fieldName" (action answerChanged) }}`);
    assert.equal(this.$('.study-type.choice').eq(0).text().trim(), 'Small Familial');
    assert.equal(this.$('.study-type.choice input').eq(0).attr('value'), 'Small Familial');
    assert.equal(this.$('.study-type.choice').eq(1).text().trim(), 'Large Population (Requires 20+ samples)');
    assert.equal(this.$('.study-type.choice input').eq(1).attr('value'), 'Large Population');
  });

  test('it sends answerChanged when selecting a choice', function(assert) {
    const expectedValues = ['Small Familial', 'Large Population'];
    assert.expect(expectedValues.length);
    expectedValues.forEach(async (expectedValue, index) => {
      this.set('answerChanged', (sender) => {
        assert.equal(sender.get('answerValue'), expectedValue);
      });
      await render(hbs`{{questionnaire/exomeseq-studytype-choice "fieldName" answerChanged=(action answerChanged)}}`);
      this.$('.study-type.choice').eq(index).click();
    });
  });

  // Below are copied verbatim from string-field-test, suggesting a refactoring should be done
  test('it shows/hides errors based on answerFormErrors.show', async function(assert) {
    this.set('fieldName', 'field-name');
    this.set('answerChanged', ()=>{});
    this.set('answerFormErrors', EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Error Message'}],
      setError() { }
    }));
    await render(
      hbs`{{questionnaire/exomeseq-studytype-choice fieldName=fieldName answerChanged=(action answerChanged)
                                                                answerFormErrors=answerFormErrors}}`
    );
    assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

    this.set('answerFormErrors.show', false);
    await render(
      hbs`{{questionnaire/exomeseq-studytype-choice fieldName=fieldName answerChanged=(action answerChanged)
                                                                answerFormErrors=answerFormErrors}}`
    );
    assert.equal(this.$('.error-panel').text().trim(), '');
  });

  test('it correctly observes error array', function(assert) {
    const errors = EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Empty'}],
      setError() { }
    });
    this.set('answerFormErrors', errors);
    this.set('answerChanged', ()=>{});
    this.set('fieldName', 'field-name');
    run(async () => {
      // Initially empty
      await render(
        hbs`{{questionnaire/exomeseq-studytype-choice fieldName=fieldName answerChanged=(action answerChanged)
                                                                  answerFormErrors=answerFormErrors}}`
      );
      assert.equal(this.$('.error-panel').text().trim(), 'Empty');

      // Now replace the errors and verify the new error is displayed
      this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
      assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
    });
  });
});
