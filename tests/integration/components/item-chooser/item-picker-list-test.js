import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('item-chooser/item-picker-list', 'Integration | Component | item chooser/item picker list', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{item-chooser/item-picker-list}}`);
  assert.equal(this.$().text().trim(), '');
});

