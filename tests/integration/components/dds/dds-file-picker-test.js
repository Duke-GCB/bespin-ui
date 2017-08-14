import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-file-picker', 'Integration | Component | dds/dds file picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-file-picker}}`);
  assert.ok(this.$().text());
});

test('it renders dds-resource-list-header button only when there are files', function(assert) {
  this.set('resources', [Ember.Object.create({isFile: true})]);
  this.render(hbs`{{dds/dds-file-picker resources=resources}}`);
  assert.equal(this.$('.dds-resource-list-header').length, 1);
  this.set('resources', [Ember.Object.create({isFile: false})]);
  this.render(hbs`{{dds/dds-file-picker resources=resources}}`);
  assert.equal(this.$('.dds-resource-list-header').length, 0);
});
