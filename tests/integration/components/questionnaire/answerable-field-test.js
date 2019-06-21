import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/answerable field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders nothing but requires two positional parameters', async function(assert) {
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/answerable-field "someFieldname" (action externalAction)}}`);
    assert.equal(this.$().text().trim(), '');
  });
});
