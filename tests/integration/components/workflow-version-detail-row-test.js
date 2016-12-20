import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-detail-row', 'Integration | Component | workflow version detail row', {
  integration: true
});

test('it renders workflow version details', function(assert) {
  let version = {version: 34, url: 'http://example.edu/workflows/workflow.cwl'};
  this.set('version' ,version);
  this.render(hbs`{{workflow-version-detail-row version}}`);

  assert.equal(this.$('.workflow-version-version').text().trim(), '34');
  assert.equal(this.$('.workflow-version-url').text().trim(), 'http://example.edu/workflows/workflow.cwl');
});
