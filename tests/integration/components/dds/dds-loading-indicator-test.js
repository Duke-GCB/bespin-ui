import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds loading indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{#dds/dds-loading-indicator}}Loading...{{/dds/dds-loading-indicator}}`);
    assert.equal(this.$().text().trim(), 'Loading...');
  });
});
