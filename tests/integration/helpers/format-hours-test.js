
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-hours', 'helper:format-hours', {
  integration: true
});

test('it formats a float to 1 decimal point by default', function(assert) {
  this.set('inputValue', 1.2312312);
  this.render(hbs`{{format-hours inputValue}}`);
  assert.equal(this.$().text(), '1.2');
});

test('it formats a float based on digits after decimal point', function(assert) {
  this.set('inputValue', 1.2312312);
  this.render(hbs`{{format-hours inputValue digits=2}}`);
  assert.equal(this.$().text(), '1.23');
});

test('it adds a suffix if there is a value', function(assert) {
  this.set('inputValue', 1.2312312);
  this.render(hbs`{{format-hours inputValue suffix=" hours"}}`);
  assert.equal(this.$().text(), '1.2 hours');
});

test('it shows nothing if results in 0', function(assert) {
  this.set('inputValue', 0.0);
  this.render(hbs`{{format-hours inputValue suffix=" hours"}}`);
  assert.equal(this.$().text(), '');
});

test('it shows nothing if NaN', function(assert) {
  this.set('inputValue', NaN);
  this.render(hbs`{{format-hours inputValue suffix=" hours"}}`);
  assert.equal(this.$().text(), '');
});
