import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion =  Ember.Object.create({
  getVersionInfo() {return Ember.RSVP.resolve({content: btoa('# Version Info')})}
});

moduleForComponent('workflows/workflow-version-detail', 'Integration | Component | workflows/workflow version detail', {
  integration: true,
  beforeEach() {
    this.set('workflowVersion', workflowVersion);
  }
});

test('it renders summary, details, and history', function(assert) {
  this.render(hbs`{{workflows/workflow-version-detail workflowVersion}}`);
  assert.equal(this.$('.workflow-version-detail').length, 1);
  assert.equal(this.$('.workflow-version-detail .workflow-version-summary').length, 1);
  assert.equal(this.$('.workflow-version-detail .workflow-version-summary .workflow-version-tool-details').length, 1);
  assert.equal(this.$('.workflow-version-detail .workflow-version-history').length, 1);
});
