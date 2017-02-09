import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';


moduleForComponent('dds/dds-resource-tree', 'Integration | Component | dds/dds resource tree', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
    this.get('store').reset();
    this.set('store.queryFunction', function() {
      return [{name: 'file1.txt', kind: 'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}];
    });
  }
});

test('it renders children when expanded', function(assert) {
  this.set('resource', {name: 'folder', kind:'dds-folder'});
  let children = [{name: 'file1.txt', kind:'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}];
  this.set('children', children);
  this.render(hbs`{{dds/dds-resource-tree resource children=children}}`);
  assert.equal(this.$('li.dds-resource-list-item').length, 0);
  this.render(hbs`{{dds/dds-resource-tree resource children=children expanded=true}}`);
  assert.equal(this.$('li.dds-resource-list-item').length, 2);
});

test('it fetches only on first expansion', function(assert) {
  this.set('resource', {name: 'folder', kind:'dds-folder'});
  let expanded = false;
  this.set('expanded', expanded);
  this.render(hbs`{{dds/dds-resource-tree resource store=store expanded=expanded}}`);
  assert.equal(this.get('expanded'), false);
  assert.equal(this.$('li.dds-resource-list-item').length, 0);
  assert.equal(this.get('store.queryCount'), 0);
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), true);
  assert.equal(this.$('li.dds-resource-list-item').length, 2);
  assert.equal(this.get('store.queryCount'), 1, 'should have registered one query');
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), false);
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), true);
  assert.equal(this.get('store.queryCount'), 1);
});
