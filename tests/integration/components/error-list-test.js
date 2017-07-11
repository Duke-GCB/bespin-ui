import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-list', 'Integration | Component | error list', {
  integration: true
});

test('it renders', function(assert) {
  this.set('errors', [1,2,3]);
  this.set('message', 'Message');
  this.render(hbs`{{error-list errors message}}`);
  assert.equal(this.$('p.lead').text(), 'Message:', 'Renders error message with colon');
  assert.equal(this.$('dl').length, 3, 'Renders an error-detail for each item in errors');
});

