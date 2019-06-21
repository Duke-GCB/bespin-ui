import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sensitive value', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders asterisks instead of value initially', async function(assert) {
    this.set('secretValue', 'Secret123');
    await render(hbs`{{sensitive-value secretValue}}`);
    assert.equal(this.$('.sensitive-value-span').text(), '*********',
      'Initially value should display *s when showLeadingCharacters is not specified');
  });

  test('it renders part of the value when hidden based on showLeadingCharacters', async function(assert) {
    this.set('secretValue', 'Secret123');
    await render(hbs`{{sensitive-value secretValue showLeadingCharacters=2}}`);
    assert.equal(this.$('.sensitive-value-span').text(), 'Se*******',
      'Initially value should display as the first showLeadingCharacters characters then *s');
  });

  test('it renders value once show button is clicked', async function(assert) {
    this.set('secretValue', 'Secret123');
    await render(hbs`{{sensitive-value secretValue}}`);
    run(() => this.$('.sensitive-value-show-button').click());
    assert.equal(this.$('.sensitive-value-span').text(), 'Secret123',
      'value should display normally after show button is clicked');
  });

  test('it renders show button initially', async function(assert) {
    this.set('secretValue', 'Secret123');
    await render(hbs`{{sensitive-value secretValue}}`);
    assert.equal(this.$('.sensitive-value-show-button').text(), 'Show', 'show button should be visible initially');
  });

  test('it hides show button after it is clicked', async function(assert) {
    this.set('secretValue', 'Secret123');
    await render(hbs`{{sensitive-value secretValue}}`);
    run(() => this.$('.sensitive-value-show-button').click());
    assert.equal(this.$('.sensitive-value-show-button').text(), '', 'show button should be hidden after it is clicked');
  });
});
