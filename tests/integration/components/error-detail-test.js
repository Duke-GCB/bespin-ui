import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('error', {detail: 'Not found', status: 404});
    await render(hbs`{{error-detail error}}`);
    assert.equal(this.$('.error-details').text().trim(), 'Not found');
    assert.equal(this.$('.error-status').text().trim(), '404');
  });
});
