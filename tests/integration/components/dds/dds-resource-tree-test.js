import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

module('Integration | Component | dds/dds resource tree', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
    this.store = this.owner.lookup('service:store');
    this.get('store').reset();
    this.set('store.queryFunction', function() {
      return [
        {name: 'file1.txt', kind: 'dds-file', isFile: true},
        {name: 'file2.txt', kind: 'dds-file', isFile: true}
        ];
    });
  });

  test('it renders children when expanded', async function(assert) {
    this.set('resource', {name: 'folder', kind:'dds-folder'});
    let children = [{name: 'file1.txt', kind:'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}];
    this.set('children', children);
    await render(hbs`{{dds/dds-resource-tree resource children=children}}`);
    assert.equal(this.$('li.dds-resource-list-item').length, 0);
    await render(hbs`{{dds/dds-resource-tree resource children=children expanded=true}}`);
    assert.equal(this.$('li.dds-resource-list-item').length, 2);
  });

  test('it fetches only on first expansion', async function(assert) {
    this.set('resource', {name: 'folder', kind:'dds-folder'});
    this.set('expanded', false);
    await render(hbs`{{dds/dds-resource-tree resource store=store expanded=expanded}}`);
    assert.equal(this.get('expanded'), false, 'should not be initially expanded');
    assert.equal(this.$('li.dds-resource-list-item').length, 0, 'should not have any dds-resource-list-items yet');
    assert.equal(this.$('li.dds-resource-list-header').length, 0, 'should not show the resource list header yet');
    assert.equal(this.get('store.queryCount'), 0, 'store should not have been queried yet');
    this.set('expanded', true);
    // Used to send a click to the dds-resource-name but that doesn't work on the first pass anymore
    assert.equal(this.get('expanded'), true, 'Should now be expanded');
    assert.equal(this.$('li.dds-resource-list-item').length, 2);
    assert.equal(this.$('li.dds-resource-list-header').length, 1);
    assert.equal(this.get('store.queryCount'), 1, 'should have registered one query');
    this.$('.dds-resource-name').click();
    assert.equal(this.get('expanded'), false);
    this.$('.dds-resource-name').click();
    assert.equal(this.get('expanded'), true);
    assert.equal(this.get('store.queryCount'), 1);
  });

  test('it renders dds-resource-list-header button only when there are files', async function(assert) {
    this.set('children', [EmberObject.create({isFile: true})]);
    await render(hbs`{{dds/dds-resource-tree children=children expanded=true}}`);
    assert.equal(this.$('.dds-resource-list-header').length, 1);
    this.set('children', [EmberObject.create({isFile: false})]);
    await render(hbs`{{dds/dds-resource-tree children=children expanded=true}}`);
    assert.equal(this.$('.dds-resource-list-header').length, 0);
  });
});
