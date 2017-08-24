import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-detail-row', 'Integration | Component | workflow version detail row', {
  integration: true
});

test('it renders', function(assert) {

  let version = {version: 42, url: 'http://somwhere.edu/workflows/workflow.cwl'};
  this.set('version', version);
  this.render(hbs`{{workflow-version-detail-row version}}`);

  assert.equal(this.$('.workflow-version-summary-version').text().trim(), '42');
  assert.equal(this.$('.workflow-version-summary-url').attr('href'), 'http://somwhere.edu/workflows/workflow.cwl');
  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Empty description');
});
