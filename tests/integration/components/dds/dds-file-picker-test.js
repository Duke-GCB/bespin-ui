import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-file-picker', 'Integration | Component | dds/dds file picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-file-picker}}`);
  assert.ok(this.$().text());
});

test('it renders dds-resource-list-header button only when there are files', function(assert) {
  this.set('children', [EmberObject.create({isFile: true})]);
  this.render(hbs`{{dds/dds-file-picker children=children}}`);
  assert.equal(this.$('.dds-resource-list-header').length, 1);
  this.set('children', [EmberObject.create({isFile: false})]);
  this.render(hbs`{{dds/dds-file-picker children=children}}`);
  assert.equal(this.$('.dds-resource-list-header').length, 0);
});
