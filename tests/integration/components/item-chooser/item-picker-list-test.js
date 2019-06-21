import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | item chooser/item picker list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let items = [{id: 1}, {id:2}, {id:3}].map(function(item) { return EmberObject.create(item); });
    this.set('items', items);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{item-chooser/item-picker-list}}`);
    assert.equal(this.$().text().trim(), '');
  });

  test('it renders a detailComponent for each item', async function(assert) {
    await render(hbs`{{item-chooser/item-picker-list items}}`);
    assert.equal(this.$('span.detail-component').length, 3);
  });
});
