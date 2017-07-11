import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-detail', 'Integration | Component | error detail', {
  integration: true
});

test('it renders', function(assert) {
  this.set('error', {detail: 'Not found', status: 404});
  this.render(hbs`{{error-detail error}}`);
  assert.equal(this.$('.error-detail').text().trim(), 'Not found');
  assert.equal(this.$('.error-status').text().trim(), '404');
});
