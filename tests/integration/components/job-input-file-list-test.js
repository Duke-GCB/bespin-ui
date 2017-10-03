import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-input-file-list', 'Integration | Component | job input file list', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-input-file-list}}`);
  assert.equal(this.$('table').length, 0, 'should not render a table when no files');
  assert.equal(this.$().text().trim(), '');
});

test('it renders a table when there are files', function(assert) {
  this.set('files', [Ember.Object.create({destinationPath: '/path', 'size': 100})]);
  this.render(hbs`{{job-input-file-list files}}`);
  assert.equal(this.$('table').length, 1);
  assert.equal(this.$('td').length, 2);
});

test('it renders From data source in panel-heading only when there is a source', function(assert) {
  this.set('files', [Ember.Object.create()]);
  this.set('source', '');
  this.render(hbs`{{job-input-file-list files source}}`);
  assert.equal(this.$('div.panel-heading').length, 0);

  this.set('files', [Ember.Object.create()]);
  this.set('source', 'devnull');
  this.render(hbs`{{job-input-file-list files source}}`);
  assert.equal(this.$('div.panel-heading').length, 1);
  assert.equal(this.$('div.panel-heading').text().trim(), 'From devnull');
});

test('it renders human readable sizes', function(assert) {
  this.set('files', [Ember.Object.create({destinationPath: 'file.gz', 'size': 7 * 1024 * 1024 * 1024})]);
  this.render(hbs`{{job-input-file-list files}}`);
  assert.equal(this.$('table').length, 1);
  assert.equal(this.$('td').length, 2);
  assert.equal(this.$('td.file-destination-path').text(), 'file.gz');
  assert.equal(this.$('td.file-size').text(), '7.00 GiB');
});
