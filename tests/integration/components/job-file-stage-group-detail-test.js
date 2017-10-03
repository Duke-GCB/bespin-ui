import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-file-stage-group-detail', 'Integration | Component | job file stage group detail', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-file-stage-group-detail}}`);
  assert.equal(this.$().text().trim(), '');
  assert.equal(this.$('div.file-list-panel').length, 0);
});

test('it renders a job-input-file-list for ddsFiles when there are ddsFiles', function(assert) {
  let stageGroup = Ember.Object.create({
    ddsFiles: [Ember.Object.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 1);
  assert.equal(this.$('div.panel-heading').text().trim(), 'From Duke Data Service');
});

test('it renders a job-input-file-list for url files when there are urlFiles', function(assert) {
  let stageGroup = Ember.Object.create({
    urlFiles: [Ember.Object.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 1);
  assert.equal(this.$('div.panel-heading').text().trim(), 'From Web URLs');
});

test('it renders two job-input-file-lists for url files when there are both ddsFiles and urlFiles', function(assert) {
  let stageGroup = Ember.Object.create({
    ddsFiles: [Ember.Object.create()],
    urlFiles: [Ember.Object.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 2);
  assert.equal(this.$('div.panel-heading').eq(0).text().trim(), 'From Duke Data Service');
  assert.equal(this.$('div.panel-heading').eq(1).text().trim(), 'From Web URLs');
});
