import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/file-group-file', 'Integration | Component | questionnaire/file group file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/file-group-file}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/file-group-file}}
      template block text
    {{/questionnaire/file-group-file}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it handles click action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});
