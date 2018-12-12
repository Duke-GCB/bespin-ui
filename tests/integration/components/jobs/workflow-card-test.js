import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/workflow-card', 'Integration | Component | jobs/workflow card', {
  integration: true
});

test('it renders', function(assert) {
  const workflowVersion = {
    workflow: {name: 'Exome Seq'},
    version: '1',
    disableUi: false,
  };
  const workflow = {
    latestVersion: workflowVersion
  };
  this.set('workflow', workflow);
  this.render(hbs`{{jobs/workflow-card workflow=workflow}}`);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');
  assert.equal(this.$('input').attr('disabled'), null, 'radiobutton should be enabled');
  assert.equal(this.$('.workflow-version-card-disabled-message').text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jobs/workflow-card workflow=workflow}}
      template block text
    {{/jobs/workflow-card}}
  `);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');
});

test('it renders help message if workflow version is disabled', function(assert) {
  const workflowVersion = {
    workflow: {name: 'Exome Seq'},
    version: '1',
    disableUi: true,
  };
  const workflow = {
    latestVersion: workflowVersion
  };
  this.set('workflow', workflow);
  this.render(hbs`{{jobs/workflow-card workflow=workflow}}`);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');
  assert.equal(this.$('input').attr('disabled'), 'disabled', 'radiobutton should be disabled');
  assert.equal(this.$('.workflow-version-card-disabled-message').text().trim().replace(/\n +/, ' '),
    'This workflow version cannot be run from here, but can be run via bespin-cli.');
});
