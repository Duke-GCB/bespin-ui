import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('token-header-row', 'Integration | Component | token header row', {
  integration: true
});

test('it renders three columns', function(assert) {
  this.render(hbs`{{token-header-row}}`);
  assert.equal(this.$('th').length, 3);
  assert.equal(this.$('th').eq(0).text(), 'Key');
  assert.equal(this.$('th').eq(1).text(), 'Created');
  assert.equal(this.$('th').eq(2).text(), 'Delete');
});
