import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/unknown field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{questionnaire/unknown-field fieldLabel='mylabel'}}`);
    assert.equal(this.$('p').text().trim(), 'ERROR: This control has not been implemented.');
  });
});
