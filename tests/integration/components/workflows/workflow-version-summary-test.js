import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  EmberObject.create({
  versionTag: 'wf/version',
  url: 'http://version.download',
  description: 'version xyz',
  created: 'Jan 1, 2019'
});


moduleForComponent('workflows/workflow-version-summary', 'Integration | Component | workflows/workflow version summary', {
  integration: true,
  beforeEach() {
    this.set('workflowVersion', workflowVersion);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
  assert.equal(this.$('.workflow-version-summary').length, 1);
});

test('it renders panel heading with tag and download url', function(assert) {
  this.render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
  assert.equal(this.$('.workflow-version-summary span.lead .summary-tag').text(), 'Version Summary: wf/version');
  assert.equal(this.$('.workflow-version-summary span.lead .download-link a').text(), 'Download Workflow');
  assert.equal(this.$('.workflow-version-summary span.lead .download-link a').attr('href'), 'http://version.download');
});

test('it renders panel body with description and release date', function(assert) {
  this.render(hbs`{{workflows/workflow-version-summary workflowVersion}}`);
  assert.equal(this.$('.workflow-version-summary .panel-body .description').text(), 'Description: version xyz');
  assert.equal(this.$('.workflow-version-summary .panel-body .released').text(), 'Released: January 1, 2019');
});

test('it yields inside panel body', function(assert) {
  this.render(hbs`
    {{#workflows/workflow-version-summary workflowVersion}}
      <span class="hello">Hi</span>
    {{/workflows/workflow-version-summary}}
  `);
  assert.equal(this.$('.workflow-version-summary .panel-body span.hello').text(), 'Hi');
});
