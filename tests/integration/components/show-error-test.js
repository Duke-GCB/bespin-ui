import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('show-error', 'Integration | Component | show error', {
  integration: true
});

test('it renders', function(assert) {
  this.set('error', {detail: 'Not found', status: 404});
  this.render(hbs`{{show-error error}}`);
  assert.equal(this.$('.error-detail').text().trim(), 'Not found');
  assert.equal(this.$('.error-status').text().trim(), '404');
});
