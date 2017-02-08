import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('item-chooser', 'Integration | Component | item chooser', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{item-chooser title='Title' label='Hi'}}`);
  assert.equal(this.$('h3').text().trim(), 'Title');
  assert.equal(this.$('.control-label').text().trim(), 'Hi:');
  assert.equal(this.$('.back-button').text().trim(), 'Back');
  assert.equal(this.$('.next-button').text().trim(), 'Next');
});

test('it handles actions', function(assert) {
  assert.expect(2);
  this.set('items', []);
  this.set('onNext', function() { assert.ok(true); });
  this.set('onBack', function() { });
  this.render(hbs`{{item-chooser items onNext onBack}}`);
  this.$('.next-button').click();
  this.set('onNext', function() { });
  this.set('onBack', function() { assert.ok(true); });
  this.$('.back-button').click();
});
