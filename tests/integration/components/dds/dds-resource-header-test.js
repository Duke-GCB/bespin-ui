import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds resourceheader', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{dds/dds-resource-header title='Header Title' icon='iconclass'}}`);
    assert.equal(this.$().text().trim(), 'Header Title');
    assert.equal(this.$('.iconclass').length, 1);
  });

  test('it sends action on click', async function(assert) {
    this.set('testAction', () => {
      assert.ok(true);
    });
    await render(hbs`{{dds/dds-resource-header action=(action testAction)}}`);
    this.$('.dds-resource-header').click();
  });
});
