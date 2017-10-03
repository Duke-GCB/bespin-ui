import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/workflow-detail', 'Integration | Component | workflows/workflow detail', {
  integration: true
});

test('it renders', function(assert) {
  const workflowVersion2 = {
    version: '2',
    description: 'My workflow2',
    created: 'Feb 1 2017',
    url: 'somewhere.edu'
  };
  const workflowVersion3 = {
    version: '3',
    description: 'My workflow3',
    created: 'Feb 13 2017',
    url: 'somewhere.edu'
  };
  this.set('myworkflow', {
      name: 'Exomeseq',
      versions: [workflowVersion2, workflowVersion3]
  });

  // render all versions
  this.render(hbs`{{workflows/workflow-detail workflow=myworkflow}}`);
  assert.equal(this.$('h3').text().trim().replace(/ /g,''), 'Workflow:\nExomeseq');
  //highest version should be sorted first
  assert.equal(this.$('.worklflow-version-detail-markdown p').text(), 'My workflow3' + 'My workflow2');

  // render only current version
  this.render(hbs`{{workflows/workflow-detail workflow=myworkflow onlyShowCurrent=true}}`);
  assert.equal(this.$('.worklflow-version-detail-markdown p').text(), 'My workflow3');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-detail workflow=myworkflow}}
      <span class="childcontent">template block text</span>
    {{/workflows/workflow-detail}}
  `);

  assert.equal(this.$('.childcontent').html().trim(), 'template block text');
});
