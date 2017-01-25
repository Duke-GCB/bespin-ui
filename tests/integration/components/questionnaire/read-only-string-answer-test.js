import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/read-only-string-answer', 'Integration | Component | questionnaire/read only string answer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/read-only-string-answer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/read-only-string-answer}}
      template block text
    {{/questionnaire/read-only-string-answer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
