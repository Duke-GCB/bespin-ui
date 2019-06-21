import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job detail row', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  test('it renders', async function(assert) {
    const job = {id:1,name:'job', workflowVersion: {
      version: 'v2.3.0',
      workflow: {name:'RNA-seq'}},
      outputProject: '{"name":"results","project_id":"ab-12-cd-34"}'
    };
    this.set('job',job);
    await render(hbs`{{job-detail-row job}}`);

    assert.equal(this.$('.job-detail-cell-id').text().trim(), '1');
    assert.equal(this.$('.job-detail-cell-name').text().trim(), 'job');
    assert.equal(this.$('.job-detail-cell-workflow-name').text().trim().replace(/ /g, ''), 'RNA-seq-v2.3.0');
    assert.equal(this.$('.job-detail-cell-readme').text().trim(), '', 'Should not show readme link unless job is finished');
    // Without routing, the link-to doesn't generate a href
    assert.equal(this.$('a.job-show-link').length, 1, 'Should generate a link for the job details');
  });

  test('it renders readme link for finished jobs', async function(assert) {
    this.set('job', {id: 123, isFinished: true});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-readme a').text().trim(), 'README', 'Should show readme link for finished job');
    assert.equal(this.$('.job-detail-cell-readme a').attr('href'), '/jobs/123/readme');
  });

  test('it hides readme link for finished jobs', async function(assert) {
    this.set('job', {isFinished: false});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-readme a').text().trim(), '', 'Should not show readme link for unfinished job');
  });

  test('it renders a modal confirmation button for deletable jobs', async function(assert) {
    this.set('job', {isDeletable: false});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-delete button.modal-confirmation-open').length, 0);

    this.set('job', {isDeletable: true});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-delete button.modal-confirmation-open').length, 1);

  });

  test('it shows updated formatted by moment', async function(assert) {
    const date = Date.now();
    this.set('job', {lastUpdated: date});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-updated').text(), 'a few seconds ago',
      'lastUpdated should be formatted by moment to a human');
  });

  test('it shows elapsedTime with hours suffix', async function(assert) {
    this.set('job', {usage: {vmHours: 12.123}});
    await render(hbs`{{job-detail-row job}}`);
    assert.equal(this.$('.job-detail-cell-elapsed-time').html(), '12.1 hours', 'vm hours shown for elapsed time');
  });
});
