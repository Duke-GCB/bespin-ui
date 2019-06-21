import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | workflow flavor detail row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('questionnaire', {description: 'Questionnaire Description'});
    await render(hbs`{{workflow-flavor-detail-row questionnaire}}`);
    assert.equal(this.$().text().trim(), 'Questionnaire Description');
  });
});
