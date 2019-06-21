import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tokens list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders header', async function(assert) {
    await render(hbs`{{tokens-list}}`);
    assert.equal(this.$('th').length, 3, 'there should be three column headers');
    assert.equal(this.$('th').eq(0).text(), 'Key');
    assert.equal(this.$('th').eq(1).text(), 'Created');
    assert.equal(this.$('th').eq(2).text(), 'Delete');
  });

  test('it renders rows based on tokens', async function(assert) {

    await render(hbs`{{tokens-list}}`);
    assert.equal(this.$('th').length, 3, 'there should be three column headers');
    assert.equal(this.$('th').eq(0).text(), 'Key');
    assert.equal(this.$('th').eq(1).text(), 'Created');
    assert.equal(this.$('th').eq(2).text(), 'Delete');
  });
});
