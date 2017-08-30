import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/workflow-version-detail', 'Integration | Component | workflows/workflow version detail', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('workflowVersion', {
    version: '2',
    description: 'My workflow',
    created: 'today',
    url: 'somewhere.edu',
  });

  this.render(hbs`{{workflows/workflow-version-detail workflowVersion=workflowVersion}}`);
  assert.equal(this.$('.workflow-version-details-title').text().trim(), 'Version 2');
  assert.equal(this.$('.workflow-version-details-description').text().trim(), 'My workflow');
  assert.equal(this.$('.workflow-version-details-created').text().trim(), 'today');
  assert.equal(this.$('.workflow-version-details-url').text().trim(), 'somewhere.edu');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-version-detail workflowVersion=workflowVersion}}
      <span class='child-text-block'>template block text</span>
    {{/workflows/workflow-version-detail}}
  `);

  assert.equal(this.$('.child-text-block').html().trim(), 'template block text');
});
