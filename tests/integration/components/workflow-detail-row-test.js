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

test('it renders block content', function(assert) {
  this.set('workflow', {name:'Workflow 123', description: 'Sample workflow'});
// Template block usage:
  this.render(hbs`
    {{#workflow-detail-row workflow}}
      Block Content
    {{/workflow-detail-row}}
  `);

  assert.equal(this.$('.workflow-content').text().trim(), 'Block Content');
});
