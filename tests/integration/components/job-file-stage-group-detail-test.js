import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-file-stage-group-detail', 'Integration | Component | job file stage group detail', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-file-stage-group-detail}}`);
  assert.equal(this.$().text().trim(), '');
  assert.equal(this.$('div.file-list-panel').length, 0);
});

test('it renders a job-input-file-list for ddsFiles when there are ddsFiles', function(assert) {
  let stageGroup = EmberObject.create({
    ddsFiles: [EmberObject.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 1);
  assert.equal(this.$('div.panel-heading').text().trim(), 'Duke Data Service Files');
});

test('it renders a job-input-file-list for url files when there are urlFiles', function(assert) {
  let stageGroup = EmberObject.create({
    urlFiles: [EmberObject.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 1);
  assert.equal(this.$('div.panel-heading').text().trim(), 'Web URLs');
});

test('it renders two job-input-file-lists for url files when there are both ddsFiles and urlFiles', function(assert) {
  let stageGroup = EmberObject.create({
    ddsFiles: [EmberObject.create()],
    urlFiles: [EmberObject.create()]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('div.file-list-panel').length, 2);
  assert.equal(this.$('div.panel-heading').eq(0).text().trim(), 'Duke Data Service Files');
  assert.equal(this.$('div.panel-heading').eq(1).text().trim(), 'Web URLs');
});

test('it renders sorted job-input-file-list for ddsFiles when there are multiple ddsFiles', function(assert) {
  let stageGroup = EmberObject.create({
    ddsFiles: [EmberObject.create(
        {
          destinationPath:'file1.txt',
          sequenceGroup: 2,
          sequence: 2,
        }
        ), EmberObject.create(
        {
          destinationPath:'file2.txt',
          sequenceGroup: 2,
          sequence: 1
        }
        ), EmberObject.create(
        {
          destinationPath:'file3.txt',
          sequenceGroup: 0,
          sequence: 10
        }
        )]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('td.file-destination-path').text().trim(), 'file3.txt' + 'file2.txt' + 'file1.txt');
});

test('it renders sorted job-input-file-list for urlFiles when there are multiple urlFiles', function(assert) {
  let stageGroup = EmberObject.create({
    urlFiles: [EmberObject.create(
      {
        destinationPath:'file1.txt',
        sequenceGroup: 2,
        sequence: 2,
      }
    ), EmberObject.create(
      {
        destinationPath:'file2.txt',
        sequenceGroup: 2,
        sequence: 1
      }
    ), EmberObject.create(
      {
        destinationPath:'file3.txt',
        sequenceGroup: 0,
        sequence: 10
      }
    )]
  });
  this.set('stageGroup', stageGroup);
  this.render(hbs`{{job-file-stage-group-detail stageGroup}}`);
  assert.equal(this.$('td.file-destination-path').text().trim(), 'file3.txt' + 'file2.txt' + 'file1.txt');
});
