import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-latest-version-detail-row', 'Integration | Component | workflow latest version detail row', {
  integration: true
});

test('it renders workflow latest version details', function(assert) {
  let workflow = {latestVersion: {version: 34} };
  this.set('workflow', workflow);
  this.render(hbs`{{workflow-latest-version-detail-row workflow}}`);

  //assert.equal(this.$().html(), 'taco');
  assert.equal(this.$('.workflow-version-summary-version').text().trim(), '- Version 34');
  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Empty description');
  assert.equal(this.$('.workflow-latest-version-detail-row-browse-versions').text().trim(), 'Browse All Versions');

});
