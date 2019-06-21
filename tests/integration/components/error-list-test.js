import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('errors', [1,2,3]);
    this.set('message', 'Message');
    await render(hbs`{{error-list errors message}}`);
    assert.equal(this.$('p.lead').text(), 'Message', 'Renders error message');
    assert.equal(this.$('.error-detail').length, 3, 'Renders an error-detail for each item in errors');
  });
});

