import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-not-setup', 'Integration | Component | workflow not setup', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{workflow-not-setup}}`);
  assert.equal(this.$('h4').text().trim(), 'Workflow Not Setup');
  assert.equal(this.$('p').eq(0).text().trim(), 'This workflow is not setup for running via this website.');
});
