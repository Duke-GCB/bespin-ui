import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-picker', 'Integration | Component | workflow picker', {
  integration: true
});

test('it renders with no workflows', function(assert) {
  this.set('workflows', []);
  this.render(hbs`{{workflow-picker workflows}}`);
  assert.equal(this.$('').text().trim(), 'Selected Workflow:', 'renders only the selected workflow');
});

test('it renders with selected workflow', function(assert) {
  let workflows = [{id: 1, name: 'Workflow 1'}, {id: 2, name: 'Workflow 2'}];
  this.set('selectedWorkflow', workflows[0]);
  this.set('workflows', workflows);
  this.render(hbs`{{workflow-picker workflows selectedWorkflow=selectedWorkflow}}`);
  assert.equal(this.$('p.selected-workflow').text().trim(), 'Selected Workflow: Workflow 1', 'selected workflow name matches');

  this.set('selectedWorkflow', workflows[1]);
  this.render(hbs`{{workflow-picker workflows selectedWorkflow=selectedWorkflow}}`);
  assert.equal(this.$('p.selected-workflow').text().trim(), 'Selected Workflow: Workflow 2', 'selected workflow name matches');
});
