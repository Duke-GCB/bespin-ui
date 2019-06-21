import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

module('Integration | Component | questionnaire/fastq file pair list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
  });

  test('it shows/hides errors based on answerFormErrors.show', async function(assert) {
    this.set('fieldName', 'field-name');
    this.set('externalAction', () => {});
    this.set('answerFormErrors', EmberObject.create({
      show: true,
      errors: [{field: 'field-name', message: 'Error Message'}],
      setError() { }
    }));
    await render(hbs`{{questionnaire/fastq-file-pair-list fieldName=fieldName answerChanged=(action externalAction)
                                                         answerFormErrors=answerFormErrors }}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

    this.set('answerFormErrors.show', false);
    await render(hbs`{{questionnaire/fastq-file-pair-list fieldName=fieldName answerChanged=(action externalAction)
                                                         answerFormErrors=answerFormErrors }}`);
    assert.equal(this.$('.error-panel').text().trim(), '');
  });

  test('it renders a fastq-file-pair-row for each selected pair', async function(assert) {
    const fileItems = EmberObject.create({
        samples: [{},{}]
      }
    );
    this.set('fileItems', fileItems);
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/fastq-file-pair-list "FieldName" (action externalAction) fileItems=fileItems}}`);
    assert.equal(this.$('.fastq-file-pair-row').length, 2)
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
      await render(hbs`{{questionnaire/fastq-file-pair-list fieldName=fieldName answerChanged=(action externalAction)
                                                           answerFormErrors=answerFormErrors}}`);
      assert.equal(this.$('.error-panel').text().trim(), 'Empty');

      // Now replace the errors and verify the new error is displayed
      this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
      assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
    });
  });

  test('it shows no featureSupportMessage', async function(assert) {
    const fileItems = EmberObject.create({
        samples: [{},{}]
      }
    );
    this.set('fileItems', fileItems);
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/fastq-file-pair-list "FieldName" (action externalAction) fileItems=fileItems}}`);
    assert.equal(this.$('.feature-support-message').length, 0);
  });
});
