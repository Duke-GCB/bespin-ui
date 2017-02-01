import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/dds-output-directory-answers', 'Integration | Component | questionnaire/dds output directory answers', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/dds-output-directory-answers}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/dds-output-directory-answers}}
      template block text
    {{/questionnaire/dds-output-directory-answers}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
