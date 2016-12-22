import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-picker', 'Integration | Component | workflow picker', {
  integration: true
});

test('it renders with no workflows', function(assert) {
  this.set('workflows', []);
  this.render(hbs`{{workflow-picker workflows}}`);
  assert.equal(this.$('').text().trim(), '', 'renders no text');
});
