import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/file-group-list', 'Integration | Component | questionnaire/file group list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/file-group-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/file-group-list}}
      template block text
    {{/questionnaire/file-group-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
