import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | token header row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders three columns', async function(assert) {
    await render(hbs`{{token-header-row}}`);
    assert.equal(this.$('th').length, 3);
    assert.equal(this.$('th').eq(0).text(), 'Key');
    assert.equal(this.$('th').eq(1).text(), 'Created');
    assert.equal(this.$('th').eq(2).text(), 'Delete');
  });
});
