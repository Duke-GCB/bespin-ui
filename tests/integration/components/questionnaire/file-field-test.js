import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from "../../../helpers/store-stub";

module('Integration | Component | questionnaire/file field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
  });

  test('it renders with no fileItem', function(assert) {
    run(async () => {
      this.set('fileItem', null);
      this.set('externalAction', () => {});
      await render(hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem}}`);
      assert.equal(this.$('label').html(), 'SomeField from Duke Data Service');
      assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
      assert.equal(this.$('.file-field-selection div').text().trim(), 'None');
    });
  });

  test('it renders with a fileItem', function(assert) {
    run(async () => {
      this.set('fileItem', {name: 'foo.txt'});
      this.set('externalAction', () => {});
      await render(hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem}}`);
      assert.equal(this.$('label').html(), 'SomeField from Duke Data Service');
      assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
      assert.equal(this.$('.file-field-selection div').text().trim(), 'foo.txt');
    });
  });

  test('it renders with fieldLabel instead of fieldName when provided', function(assert) {
    run(async () => {
      this.set('fileItem', null);
      this.set('externalAction', () => {});
      await render(
        hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem fieldLabel="Some Label"}}`
      );
      assert.equal(this.$('label').html(), 'Some Label from Duke Data Service');
      assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
      assert.equal(this.$('.file-field-selection div').text().trim(), 'None');
    });
  });

  test('it shows/hides errors based on answerFormErrors.show', async function(assert) {
    this.set('fieldName', 'field-name');
    this.set('externalAction', () => {});
    this.set('answerFormErrors', EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Error Message'}],
      setError() { }
    }));
    await render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
                                               answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

    this.set('answerFormErrors.show', false);
    await render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
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
      await render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
                                                 answerFormErrors=answerFormErrors}}`);
      assert.equal(this.$('.error-panel').text().trim(), 'Empty');

      // Now replace the errors and verify the new error is displayed
      this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
      assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
    });
  });
});
