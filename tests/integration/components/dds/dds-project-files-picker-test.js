import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-project-files-picker', 'Integration | Component | dds/dds project files picker', {
  integration: true
});

test('it renders no form groups when loading', function(assert) {
  this.set('isLoading', true);
  this.render(hbs`{{dds/dds-project-files-picker isLoading=isLoading}}`);
  assert.equal(this.$('.form-group').length, 0);
});

test('it renders no form groups when empty', function(assert) {
  this.set('isEmpty', true);
  this.render(hbs`{{dds/dds-project-files-picker isEmpty=isEmpty}}`);
  assert.equal(this.$('.form-group').length, 0);
});

test('it renders two form groups when populated', function(assert) {
  this.set('isLoading', false);
  this.set('isEmpty', false);
  this.render(hbs`{{dds/dds-project-files-picker isLoading=isLoading isEmpty=isEmpty}}`);
  assert.equal(this.$('.form-group').length, 2);
});
