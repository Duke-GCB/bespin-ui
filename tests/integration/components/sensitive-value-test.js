import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('sensitive-value', 'Integration | Component | sensitive value', {
  integration: true
});

test('it renders asterisks instead of value initially', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value value=secretValue}}`);
  assert.equal(this.$('.sensitive-value-span').text(), '*********', 'Initially value should display as *s');
});

test('it renders value once show button is clicked', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value value=secretValue}}`);
  Ember.run(() => this.$('.sensitive-value-show-button').click());
  assert.equal(this.$('.sensitive-value-span').text(), 'Secret123',
    'value should display normally after show button is clicked');
});

test('it renders show button initially', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value value=secretValue}}`);
  assert.equal(this.$('.sensitive-value-show-button').text(), 'Show', 'show button should be visible initially');
});

test('it hides show button after it is clicked', function(assert) {
  this.set('secretValue', 'Secret123');
  this.render(hbs`{{sensitive-value value=secretValue}}`);
  Ember.run(() => this.$('.sensitive-value-show-button').click());
  assert.equal(this.$('.sensitive-value-show-button').text(), '', 'show button should be hidden after it is clicked');
});
