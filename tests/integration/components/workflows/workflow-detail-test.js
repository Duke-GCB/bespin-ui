import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/workflow-detail', 'Integration | Component | workflows/workflow detail', {
  integration: true
});

test('it renders', function(assert) {
  const workflowVersion = {
    version: '2',
    description: 'My workflow',
    created: 'today',
    url: 'somewhere.edu',
  };
  this.set('myworkflow', {
      name: 'Exomeseq',
      versions: [workflowVersion]
  });

  this.render(hbs`{{workflows/workflow-detail workflow=myworkflow}}`);

  assert.equal(this.$('h3').text().trim(), 'Exomeseq');
  assert.equal(this.$('.workflow-version-details-description').text().trim(), 'My workflow');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-detail workflow=myworkflow}}
      <span class="childcontent">template block text</span>
    {{/workflows/workflow-detail}}
  `);

  assert.equal(this.$('.childcontent').html().trim(), 'template block text');
});
