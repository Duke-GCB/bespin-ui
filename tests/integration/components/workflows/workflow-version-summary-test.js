import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  EmberObject.create({
  versionTag: 'wf/version',
  url: 'http://version.download',
  description: 'version xyz',
  created: 'Jan 1, 2019'
});


module('Integration | Component | workflows/workflow version summary', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('workflowVersion', workflowVersion);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
    assert.equal(this.$('.workflow-version-summary').length, 1);
  });

  test('it renders panel heading with tag and download url', async function(assert) {
    await render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
    assert.equal(this.$('.workflow-version-summary span.lead .summary-tag').text(), 'Version Summary: wf/version');
    assert.equal(this.$('.workflow-version-summary span.lead .download-link a').text(), 'Download Workflow');
    assert.equal(this.$('.workflow-version-summary span.lead .download-link a').attr('href'), 'http://version.download');
  });

  test('it renders panel body with description and release date', async function(assert) {
    await render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
    assert.equal(this.$('.workflow-version-summary .panel-body .description').text(), 'Description: version xyz');
    assert.equal(this.$('.workflow-version-summary .panel-body .released').text(), 'Released: January 1, 2019');
  });

  test('it yields inside panel body', async function(assert) {
    await render(hbs`
      {{#workflows/workflow-version-summary workflowVersion}}
        <span class="hello">Hi</span>
      {{/workflows/workflow-version-summary}}
    `);
    assert.equal(this.$('.workflow-version-summary .panel-body span.hello').text(), 'Hi');
  });
});
