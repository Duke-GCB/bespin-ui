import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | next back buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{next-back-buttons}}`);

    assert.equal(this.$('.back-button').text().trim(), 'Back');
    assert.equal(this.$('.next-button').text().trim(), 'Next');

  });
});
