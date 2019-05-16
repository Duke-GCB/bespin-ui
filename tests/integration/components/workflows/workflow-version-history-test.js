import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  Ember.Object.create({
  getVersionInfo() {
    return Ember.RSVP.resolve({content: btoa('# Version Info')})
  },
  versionTag: 'wf/version',
  versionInfoUrl: 'http://version.info'
});

moduleForComponent('workflows/workflow-version-history', 'Integration | Component | workflows/workflow version history', {
  integration: true,
  beforeEach() {
    this.set('workflowVersion', workflowVersion);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
  assert.equal(this.$('.workflow-version-history').length, 1);
});

test('it renders panel heading with tag and info url', function(assert) {
  this.render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
  assert.equal(this.$('.workflow-version-history span.lead .history-tag').text(), 'Version History: wf/version');
  assert.equal(this.$('.workflow-version-history span.lead .info-link a').text(), 'Version Info');
  assert.equal(this.$('.workflow-version-history span.lead .info-link a').attr('href'), 'http://version.info');
});

test('it renders panel body with markdown from getVersionInfo into HTML', function(assert) {
  this.render(hbs`{{workflows/workflow-version-history workflowVersion}}`);
  // getVersionInfo returns '# Version Info', so look for <h1>Version Info</h1>
  const renderedMarkdown = this.$('.workflow-version-history .panel-body h1');
  assert.equal(renderedMarkdown.text(), 'Version Info');
});
