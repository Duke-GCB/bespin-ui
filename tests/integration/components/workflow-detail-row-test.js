import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-detail-row', 'Integration | Component | workflow detail row', {
  integration: true
});

test('it renders workflow details', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('workflow', {name: 'Workflow 123', description: 'Sample workflow', selected: false});
  this.render(hbs`{{workflow-detail-row workflow}}`);
  assert.equal(this.$('.workflow-name').text().trim(), 'Workflow 123');
  assert.equal(this.$('.workflow-description').text().trim(), 'Sample workflow');
});

test('it renders workflow selected state', function(assert) {
  this.set('workflow', {name:'Workflow 123', description: 'Sample workflow', selected: false});
  this.render(hbs`{{workflow-detail-row workflow}}`);
  assert.equal(this.$('.glyphicon-ok').length, 0);

  this.set('workflow', {name:'Workflow 123', description: 'Sample workflow', selected: true});
  this.render(hbs`{{workflow-detail-row workflow}}`);
  assert.equal(this.$('.glyphicon-ok').length, 1);
});

test('it renders workflow versions', function(assert) {
  // Test it renders workflow versions
  let versions = [{'version': 1}, {'version': 2}];
  this.set('workflow', {name:'Workflow 123', description: 'Sample workflow with 2 versions', selected: true, versions: versions});
  this.render(hbs`{{workflow-detail-row workflow}}`);
  assert.equal(this.$('.workflow-detail-version-row').length, 2);
});
