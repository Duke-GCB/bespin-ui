import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-output-readme', 'Integration | Component | job output readme', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{job-output-readme}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#job-output-readme}}
      template block text
    {{/job-output-readme}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
