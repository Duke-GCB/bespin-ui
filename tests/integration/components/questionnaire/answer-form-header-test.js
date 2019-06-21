import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/answer form header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('questionnaire', {name: 'Header Title', description: 'Header Subtitle'});
    await render(hbs`{{questionnaire/answer-form-header questionnaire}}`);

    assert.equal(this.$('h2').text().trim(), 'Header Title');
    assert.equal(this.$('h4').text().trim(), 'Header Subtitle');
  });
});
