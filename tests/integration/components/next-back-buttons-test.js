import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('next-back-buttons', 'Integration | Component | next back buttons', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{next-back-buttons}}`);

  assert.equal(this.$('.back-button').text().trim(), 'Back');
  assert.equal(this.$('.next-button').text().trim(), 'Next');

});
