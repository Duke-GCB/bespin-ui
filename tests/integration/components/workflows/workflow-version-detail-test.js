import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  EmberObject.create({
  getVersionInfo() {return resolve({content: btoa('# Version Info')});}
});

module('Integration | Component | workflows/workflow version detail', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('workflowVersion', workflowVersion);
  });

  test('it renders summary, details, and history', async function(assert) {
    await render(hbs`{{workflows/workflow-version-detail workflowVersion}}`);
    assert.equal(this.$('.workflow-version-detail').length, 1);
    assert.equal(this.$('.workflow-version-detail .workflow-version-summary').length, 1);
    assert.equal(this.$('.workflow-version-detail .workflow-version-summary .workflow-version-tool-details').length, 1);
    assert.equal(this.$('.workflow-version-detail .workflow-version-history').length, 1);
  });
});
