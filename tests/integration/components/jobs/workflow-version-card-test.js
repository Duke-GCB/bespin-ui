import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/workflow-version-card', 'Integration | Component | jobs/workflow version card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(5);

  const workflowVersion = {
    workflow: {name: 'Exome Seq'},
    version: 'v1.0.0',
    disableUi: false,
  };
  this.set('workflowVersion', workflowVersion);
  this.set('onPicked', function(item) {
    assert.equal(item, workflowVersion);
  });
  this.render(hbs`{{jobs/workflow-version-card workflowVersion=workflowVersion onPicked=(action onPicked)}}`);

  assert.equal(this.$('.jobs-workflow-version-card-title').text().trim(), 'Exome Seq');
  assert.equal(this.$('.workflow-version-link-text').text().trim(), 'v1.0.0');
  assert.equal(this.$('input[name=selectedItem]').attr('type'), 'radio');
  this.$('input[name=selectedItem]').click();


  // Template block usage:
  this.render(hbs`
    {{#jobs/workflow-version-card workflowVersion=workflowVersion}}
      template block text
    {{/jobs/workflow-version-card}}
  `);

  assert.equal(this.$('.panel-body').text().trim(), 'template block text');

});

test('it renders help text when UI not enabled', function(assert) {
  const workflowVersion = {
    workflow: {name: 'Exome Seq'},
    version: '1',
    disableUi: true,
  };
  this.set('workflowVersion', workflowVersion);
  this.render(hbs`{{jobs/workflow-version-card workflowVersion=workflowVersion}}`);
  assert.equal(this.$('.workflow-version-card-disabled-message').text().trim().replace(/\n +/, ' '),
    'This workflow version cannot be run from here, but can be run via bespin-cli.');
  //assert.equal(this.$('input[name=selectedItem]').attr('type'), 'radio');
  //assert.equal(this.$('input[name=selectedItem]').attr('enabled'), 'radio');
});
