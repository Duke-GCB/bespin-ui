import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-detail-row', 'Integration | Component | workflow version detail row', {
  integration: true
});

test('it renders workflow version details', function(assert) {
  let workflow = {latestVersion: {version: 34, url: 'http://example.edu/workflows/workflow.cwl'} };
  this.set('workflow', workflow);
  this.render(hbs`{{workflow-version-detail-row workflow}}`);

  //assert.equal(this.$().html(), 'taco');
  assert.equal(this.$('.workflow-version-summary-version').text().trim(), '34');
  assert.equal(this.$('.workflow-version-summary-url').attr('href'), 'http://example.edu/workflows/workflow.cwl');
  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Empty description');
  assert.equal(this.$('.workflow-version-detail-row-browse-versions').text().trim(), 'Browse All Versions');

});
