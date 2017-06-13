import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answer-form-list', 'Integration | Component | questionnaire/answer form list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/answer-form-list}}`);

  assert.equal(this.$().text().trim(), 'Save');
});


test('it computes fields property', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it calculates componentNameForType', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it handles provideAnswer action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it handles provideInputFiles action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it handles save action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});
