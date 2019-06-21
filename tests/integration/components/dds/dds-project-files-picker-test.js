import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds project files picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders no form groups when loading', async function(assert) {
    this.set('isLoading', true);
    await render(hbs`{{dds/dds-project-files-picker isLoading=isLoading}}`);
    assert.equal(this.$('.form-group').length, 0);
  });

  test('it renders no form groups when empty', async function(assert) {
    this.set('isEmpty', true);
    await render(hbs`{{dds/dds-project-files-picker isEmpty=isEmpty}}`);
    assert.equal(this.$('.form-group').length, 0);
  });

  test('it renders two form groups when populated', async function(assert) {
    this.set('isLoading', false);
    this.set('isEmpty', false);
    await render(hbs`{{dds/dds-project-files-picker isLoading=isLoading isEmpty=isEmpty}}`);
    assert.equal(this.$('.form-group').length, 2);
  });
});
