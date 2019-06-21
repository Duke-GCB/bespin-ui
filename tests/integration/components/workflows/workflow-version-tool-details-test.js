import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  EmberObject.create({
  toolDetails: [1,2,3]
});

module('Integration | Component | workflows/workflow version tool details', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('workflowVersion', workflowVersion);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
    assert.equal(this.$('.workflow-version-tool-details').length, 1);
  });

  test('it renders a paragraph with description', async function(assert) {
    await render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
    assert.equal(this.$('.workflow-version-tool-details p').text().trim(), 'This workflow is composed of the tools and versions below:');
  });

  test('it renders no content if toolDetails is empty', async function(assert) {
    this.set('workflowVersion', EmberObject.create({toolDetails: null}));
    await render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
    assert.equal(this.$('').text().trim(), '');
  });
});
