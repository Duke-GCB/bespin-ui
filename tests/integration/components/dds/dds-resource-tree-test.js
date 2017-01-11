import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('dds/dds-resource-tree', 'Integration | Component | dds/dds resource tree', {
  integration: true,
  beforeEach: function() {
    this.set('store', Ember.Object.create({
      callCount: 0,
      query() {
        this.set('callCount', this.get('callCount') + 1);
        return new Ember.RSVP.Promise(function (resolve) {
          resolve([{name: 'file1.txt', kind: 'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}]);
        });
      }
    }));
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
  assert.equal(this.get('store.callCount'), 0);
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), true);
  assert.equal(this.$('li.dds-resource-list-item').length, 2);
  assert.equal(this.get('store.callCount'), 1);
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), false);
  this.$('.dds-resource-name').click();
  assert.equal(this.get('expanded'), true);
  assert.equal(this.get('store.callCount'), 1);
});
