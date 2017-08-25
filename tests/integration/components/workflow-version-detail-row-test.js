import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-detail-row', 'Integration | Component | workflow version detail row', {
  integration: true
});

test('it renders', function(assert) {

  let workflowVersion = {version: 42, url: 'http://somewhere.com/workflows/workflow.cwl'};
  this.set('workflowVersion', workflowVersion);
  this.render(hbs`{{workflow-version-detail-row workflowVersion}}`);

  assert.equal(this.$('.workflow-version-summary-version').text().trim(), ''); //version not shown in summary
  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Empty description');
});
