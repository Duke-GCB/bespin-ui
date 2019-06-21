import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sensitive-value', 'Integration | Component | sensitive value', {
  integration: true
});

test('it renders asterisks instead of value initially', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value secretValue}}`);
  assert.equal(this.$('.sensitive-value-span').text(), '*********',
    'Initially value should display *s when showLeadingCharacters is not specified');
});

test('it renders part of the value when hidden based on showLeadingCharacters', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value secretValue showLeadingCharacters=2}}`);
  assert.equal(this.$('.sensitive-value-span').text(), 'Se*******',
    'Initially value should display as the first showLeadingCharacters characters then *s');
});

test('it renders value once show button is clicked', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value secretValue}}`);
  run(() => this.$('.sensitive-value-show-button').click());
  assert.equal(this.$('.sensitive-value-span').text(), 'Secret123',
    'value should display normally after show button is clicked');
});

test('it renders show button initially', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value secretValue}}`);
  assert.equal(this.$('.sensitive-value-show-button').text(), 'Show', 'show button should be visible initially');
});

test('it hides show button after it is clicked', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value secretValue}}`);
  run(() => this.$('.sensitive-value-show-button').click());
  assert.equal(this.$('.sensitive-value-show-button').text(), '', 'show button should be hidden after it is clicked');
});
