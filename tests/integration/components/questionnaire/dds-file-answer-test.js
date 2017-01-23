import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/dds-file-answer', 'Integration | Component | questionnaire/dds file answer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/dds-file-answer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/dds-file-answer}}
      template block text
    {{/questionnaire/dds-file-answer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
