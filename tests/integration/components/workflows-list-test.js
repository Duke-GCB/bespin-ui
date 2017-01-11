import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows-list', 'Integration | Component | workflows list', {
  integration: true
});

test('it renders', function(assert) {
  let versions = [{'version': 1}, {'version': 2}];
  let workflow = {name: 'Workflow 123', description: 'Sample workflow', selected: false, versions: versions};
  this.set('workflows', [workflow]);

  this.render(hbs`{{workflows-list workflows}}`);
  assert.equal(this.$('.workflow-detail-row').length, 1);
  assert.equal(this.$('.workflow-version-detail-row').length, 2);
});
