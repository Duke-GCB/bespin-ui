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
    created: 'Feb 01 2017',
    url: 'somewhere.edu',
  });

  this.render(hbs`{{workflows/workflow-version-detail workflowVersion=workflowVersion}}`);
  assert.equal(this.$('.workflow-version-details-title').text().trim().replace(/ |\n/g,''), '-Version2(Current)-February1,2017');
  assert.equal(this.$('.worklflow-version-detail-markdown').text().trim(), 'Description\nMy workflow');
  assert.equal(this.$('.worklflow-version-detail-download-cwl-url').attr('href'), 'somewhere.edu');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-version-detail workflowVersion=workflowVersion}}
      <span class='child-text-block'>template block text</span>
    {{/workflows/workflow-version-detail}}
  `);

  assert.equal(this.$('.child-text-block').html().trim(), 'template block text');
});
