
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:format-hours', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats a float to 1 decimal point by default', async function(assert) {
    this.set('inputValue', 1.2312312);
    await render(hbs`{{format-hours inputValue}}`);
    assert.equal(this.$().text(), '1.2');
  });

  test('it rounds up value', async function(assert) {
    this.set('inputValue', 1.55);
    await render(hbs`{{format-hours inputValue}}`);
    assert.equal(this.$().text(), '1.6');
  });

  test('it formats a float based on digits after decimal point', async function(assert) {
    this.set('inputValue', 1.2312312);
    await render(hbs`{{format-hours inputValue digits=2}}`);
    assert.equal(this.$().text(), '1.23');
  });

  test('it adds a suffix if there is a value', async function(assert) {
    this.set('inputValue', 1.2312312);
    await render(hbs`{{format-hours inputValue suffix=" hours"}}`);
    assert.equal(this.$().text(), '1.2 hours');
  });

  test('it shows nothing if results in 0', async function(assert) {
    this.set('inputValue', 0.0);
    await render(hbs`{{format-hours inputValue suffix=" hours"}}`);
    assert.equal(this.$().text(), '');
  });

  test('it shows nothing if NaN', async function(assert) {
    this.set('inputValue', NaN);
    await render(hbs`{{format-hours inputValue suffix=" hours"}}`);
    assert.equal(this.$().text(), '');
  });
});
