import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const workflowVersion =  Ember.Object.create({
  toolDetails: [1,2,3]
});

moduleForComponent('workflows/workflow-version-tool-details', 'Integration | Component | workflows/workflow version tool details', {
  integration: true,
  beforeEach() {
    this.set('workflowVersion', workflowVersion);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
  assert.equal(this.$('.workflow-version-tool-details').length, 1);
});

test('it renders a paragraph with description', function(assert) {
  this.render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
  assert.equal(this.$('.workflow-version-tool-details p').text().trim(), 'This workflow is composed of the tools and versions below:');
});

test('it renders no content if toolDetails is empty', function (assert) {
  this.set('workflowVersion', Ember.Object.create({toolDetails: null}));
  this.render(hbs`{{workflows/workflow-version-tool-details workflowVersion}}`);
  assert.equal(this.$('').text().trim(), '');
});
