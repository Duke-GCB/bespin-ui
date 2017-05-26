import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answer-form-list', 'Integration | Component | questionnaire/answer form list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/answer-form-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/answer-form-list}}
      template block text
    {{/questionnaire/answer-form-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
