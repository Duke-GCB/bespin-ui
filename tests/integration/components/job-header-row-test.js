import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-header-row', 'Integration | Component | job header row', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-header-row}}`);
  assert.equal(this.$('th').length, 7);
});
