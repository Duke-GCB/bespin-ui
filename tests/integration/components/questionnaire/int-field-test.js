import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/int field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('fieldName', 'field');
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/int-field fieldName (action externalAction)}}`);
    assert.equal(this.$().text().trim(), 'Field');
  });

  test('it renders with label when provided', async function(assert) {
    this.set('fieldName', 'field');
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/int-field fieldName (action externalAction) fieldLabel="MyLabel"}}`);
    assert.equal(this.$().text().trim(), 'MyLabel');
  });

  test('it shows/hides errors based on answerFormErrors.show', async function(assert) {
    this.set('fieldName', 'field-name');
    this.set('externalAction', () => {});
    this.set('answerFormErrors', EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Error Message'}],
      setError() { }
    }));
    await render(hbs`{{questionnaire/int-field fieldName=fieldName answerChanged=(action externalAction)
                                              answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

    this.set('answerFormErrors.show', false);
    await render(hbs`{{questionnaire/int-field fieldName=fieldName answerChanged=(action externalAction)
                                              answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), '');
  });

  test('it correctly observes error array', function(assert) {
    const errors = EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Empty'}],
      setError() { }
    });
    this.set('answerFormErrors', errors);
    this.set('fieldName', 'field-name');
    this.set('externalAction', () => {});
    run(async () => {
      // Initially empty
      await render(hbs`{{questionnaire/int-field fieldName=fieldName answerChanged=(action externalAction)
                                                answerFormErrors=answerFormErrors}}`);
      assert.equal(this.$('.error-panel').text().trim(), 'Empty');

      // Now replace the errors and verify the new error is displayed
      this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
      assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
    });
  });

  test('it sets errors based on validityDidChange', async function(assert) {
    this.set('fieldName', 'field-name');
    this.set('externalAction', () => {});
    this.set('answerFormErrors', EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Error Message'}],
      setError() { }
    }));
    await render(hbs`{{questionnaire/int-field fieldName=fieldName answerChanged=(action externalAction)
                                              answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

    this.set('answerFormErrors.show', false);
    await render(hbs`{{questionnaire/int-field fieldName=fieldName answerChanged=(action externalAction)
                                              answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), '');
  });
});
