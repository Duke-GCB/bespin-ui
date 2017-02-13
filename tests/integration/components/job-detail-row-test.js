import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-detail-row', 'Integration | Component | job detail row', {
  integration: true
});

test('it renders', function(assert) {
  const job = {id:1,name:'job', workflowVersion: {workflow: {name:'RNA-seq'}}, outputDir: '{"name":"results","project_id":"ab-12-cd-34"}'};
  this.set('job',job);
  this.render(hbs`{{job-detail-row job}}`);

  assert.equal(this.$('.job-detail-cell-id').text().trim(), '1');
  assert.equal(this.$('.job-detail-cell-name').text().trim(), 'job');
  assert.equal(this.$('.job-detail-cell-workflow-name').text().trim(), 'RNA-seq');
  assert.equal(this.$('.job-detail-cell-results').text().trim(), '', 'Should not show results link unless job is finished');
  // Without routing, the link-to doesn't generate a href
  assert.equal(this.$('a.job-show-link').length, 1, 'Should generate a link for the job details');
});

test('it renders results link for finished jobs', function(assert) {
  this.set('job', {isFinished: true});
  this.render(hbs`{{job-detail-row job}}`);
  assert.equal(this.$('a.job-results-link').text().trim(), 'Results', 'Should show results for finished job');
});

test('it hides results link for finished jobs', function(assert) {
  this.set('job', {isFinished: false});
  this.render(hbs`{{job-detail-row job}}`);
  assert.equal(this.$('.job-detail-cell-results a').text().trim(), '', 'Should not show Results link for unfinished job');
});
