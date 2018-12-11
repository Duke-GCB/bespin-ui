import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/workflow-version-detail', 'Integration | Component | workflows/workflow version detail', {
  integration: true
});

test('it renders', function(assert) {

  //test with 'current' version
  this.set('workflowVersion', {
    id: '123',
    version: '2',
    description: 'My workflow',
    created: 'Feb 01 2017',
    url: 'somewhere.edu',
    methodsDocument: {
      contents: "# Description\nMy workflow\n# Methods"
    },
    workflow: {
      name: "WorkflowTitle",
      latestEnabledVersion: {
        id: '123'
      }
    }
  });

  //test default which doesn't show methods in markdown
  this.render(hbs`{{workflows/workflow-version-detail workflowVersion=workflowVersion}}`);
  assert.equal(this.$('.workflow-version-details-title').text().trim().replace(/ |\n/g,''),
    'WorkflowTitle-Version2(Current)-February1,2017');
  assert.equal(this.$('.workflow-version-detail-markdown').text().trim(), 'Description\nMy workflow');
  assert.equal(this.$('.workflow-version-detail-download-cwl-url').attr('href'), 'somewhere.edu');

  //test showing methods markdown (that will contain the description)
  this.render(hbs`{{workflows/workflow-version-detail workflowVersion=workflowVersion showMethods=true}}`);
  assert.equal(this.$('.workflow-version-detail-markdown').text().trim(), 'Description\nMy workflow\nMethods');

  //test older version
  this.set('workflowVersion', {
    id: '123',
    version: '2',
    description: 'My workflow',
    created: 'Feb 01 2017',
    url: 'somewhere.edu',
    workflow: {
      name: "WorkflowTitle",
      latestVersion: {
        id: '124'
      }
    }
  });
  this.render(hbs`{{workflows/workflow-version-detail workflowVersion=workflowVersion}}`);
  assert.equal(this.$('.workflow-version-details-title').text().trim().replace(/ |\n/g,''),
    'WorkflowTitle-Version2-February1,2017');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-version-detail workflowVersion=workflowVersion}}
      <span class='child-text-block'>template block text</span>
    {{/workflows/workflow-version-detail}}
  `);

  assert.equal(this.$('.child-text-block').html().trim(), 'template block text');
});
