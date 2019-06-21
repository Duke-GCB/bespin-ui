import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds file picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{dds/dds-file-picker}}`);
    assert.ok(this.$().text());
  });

  test('it renders dds-resource-list-header button only when there are files', async function(assert) {
    this.set('children', [EmberObject.create({isFile: true})]);
    await render(hbs`{{dds/dds-file-picker children=children}}`);
    assert.equal(this.$('.dds-resource-list-header').length, 1);
    this.set('children', [EmberObject.create({isFile: false})]);
    await render(hbs`{{dds/dds-file-picker children=children}}`);
    assert.equal(this.$('.dds-resource-list-header').length, 0);
  });
});
