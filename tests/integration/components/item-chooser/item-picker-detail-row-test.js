import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('item-chooser/item-picker-detail-row', 'Integration | Component | item chooser/item picker detail row', {
  integration: true
});


test('it renders workflow details', function(assert) {
  this.set('workflow', Ember.Object.create({name: 'Workflow 123', selected: false}));
  this.render(hbs`{{item-chooser/item-picker-detail-row workflow}}`);
  assert.equal(this.$('.item-title').text().trim(), 'Workflow 123');
});

test('it renders block content', function(assert) {
  this.set('workflow', Ember.Object.create({name:'Workflow 123', description: 'Sample workflow'}));
// Template block usage:
  this.render(hbs`
    {{#item-chooser/item-picker-detail-row workflow}}
      Block Content
    {{/item-chooser/item-picker-detail-row}}
  `);
  assert.equal(this.$('.item-content').text().trim(), 'Block Content');
});


test('it selects on click', function(assert) {
  assert.expect(2);
  let workflow = Ember.Object.create({name:'Workflow 123', description: 'Sample workflow'});
  this.set('workflow', workflow);
  this.set('onPick', function() {
    assert.ok(true, 'onPick was called');
  });
  this.render(hbs`{{item-chooser/item-picker-detail-row workflow null onPick}}`);
  assert.notOk(this.$('input').get('checked'));
  this.$('label').click();
});
