import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('item-chooser/item-picker-list', 'Integration | Component | item chooser/item picker list', {
  integration: true,
  beforeEach() {
    let items = [{id: 1}, {id:2}, {id:3}].map(function(item) { return Ember.Object.create(item); });
    this.set('items', items);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{item-chooser/item-picker-list}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders a detailComponent for each item', function(assert) {
  this.render(hbs`{{item-chooser/item-picker-list items}}`);
  assert.equal(this.$('span.detail-component').length, 3);
});
