import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  EmberObject.create({
  getVersionInfo() {
    return resolve({content: btoa('# Version Info')});
  },
  versionTag: 'wf/version',
  versionInfoUrl: 'http://version.info'
});

module('Integration | Component | workflows/workflow version history', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('workflowVersion', workflowVersion);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
    assert.equal(this.$('.workflow-version-history').length, 1);
  });

  test('it renders panel heading with tag and info url', async function(assert) {
    await render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
    assert.equal(this.$('.workflow-version-history span.lead .history-tag').text(), 'Version History: wf/version');
    assert.equal(this.$('.workflow-version-history span.lead .info-link a').text(), 'Version Info');
    assert.equal(this.$('.workflow-version-history span.lead .info-link a').attr('href'), 'http://version.info');
  });

  test('it renders panel body with markdown from getVersionInfo into HTML', async function(assert) {
    await render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
    // getVersionInfo returns '# Version Info', so look for <h1>Version Info</h1>
    const renderedMarkdown = this.$('.workflow-version-history .panel-body h1');
    assert.equal(renderedMarkdown.text(), 'Version Info');
  });
});
