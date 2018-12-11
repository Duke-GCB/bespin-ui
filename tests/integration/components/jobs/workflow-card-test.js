import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/workflow-card', 'Integration | Component | jobs/workflow card', {
  integration: true
});

test('it renders', function(assert) {
  const workflowVersion = {
    workflow: {name: 'Exome Seq'},
    version: '1',
    enableUi: true,
  };
  this.set('workflowVersion', workflowVersion);
  this.render(hbs`{{jobs/workflow-card workflowVersion=workflowVersion}}`);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');

  // Template block usage:
  this.render(hbs`
    {{#jobs/workflow-card workflowVersion=workflowVersion}}
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
    enableUi: false,
  };
  this.set('workflowVersion', workflowVersion);
  this.render(hbs`{{jobs/workflow-card workflowVersion=workflowVersion}}`);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), null);
  assert.equal(this.$('.workflow-version-card-cli-help').text().trim(),
    'This workflow can only be run via bespin-cli.');
});
