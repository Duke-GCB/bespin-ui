import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/file-pair-file', 'Integration | Component | questionnaire/file pair file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/file-pair-file}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/file-pair-file}}
      template block text
    {{/questionnaire/file-pair-file}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
