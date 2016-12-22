import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-picker-detail-row', 'Integration | Component | workflow picker detail row', {
  integration: true
});

test('it renders workflow details', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('workflow', {name: 'Workflow 123', description: 'Sample workflow', selected: false});
  this.render(hbs`{{workflow-picker-detail-row workflow}}`);
  assert.equal(this.$('.workflow-name').text().trim(), 'Workflow 123');
  assert.equal(this.$('.workflow-description').text().trim(), 'Sample workflow');
});

test('it renders block content', function(assert) {
  this.set('workflow', {name:'Workflow 123', description: 'Sample workflow'});
// Template block usage:
  this.render(hbs`
    {{#workflow-picker-detail-row  workflow}}
      Block Content
    {{/workflow-picker-detail-row}}
  `);
  assert.equal(this.$('.workflow-content').text().trim(), 'Block Content');
});


test('it selects on click', function(assert) {
  assert.expect(2);
  let workflow = {name:'Workflow 123', description: 'Sample workflow'};
  this.set('workflow', workflow);
  this.set('onPick', function() {
    assert.ok(true, 'onPick was called');
  });
  this.render(hbs`{{workflow-picker-detail-row workflow null onPick}}`);
  assert.notOk(this.$('input').get('checked'));
  this.$('label').click();
});
