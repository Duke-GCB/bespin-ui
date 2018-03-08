import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answerable-field', 'Integration | Component | questionnaire/answerable field', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/answerable-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/answerable-field}}
      template block text
    {{/questionnaire/answerable-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
