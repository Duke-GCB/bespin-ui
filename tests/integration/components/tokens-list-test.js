import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tokens-list', 'Integration | Component | tokens list', {
  integration: true
});

test('it renders header', function(assert) {
  this.render(hbs`{{tokens-list}}`);
  assert.equal(this.$('th').length, 3, 'there should be three column headers');
  assert.equal(this.$('th').eq(0).text(), 'Key');
  assert.equal(this.$('th').eq(1).text(), 'Created');
  assert.equal(this.$('th').eq(2).text(), 'Delete');
});

test('it renders rows based on tokens', function(assert) {

  this.render(hbs`{{tokens-list}}`);
  assert.equal(this.$('th').length, 3, 'there should be three column headers');
  assert.equal(this.$('th').eq(0).text(), 'Key');
  assert.equal(this.$('th').eq(1).text(), 'Created');
  assert.equal(this.$('th').eq(2).text(), 'Delete');
});

