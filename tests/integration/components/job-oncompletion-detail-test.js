import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-oncompletion-detail', 'Integration | Component | job oncompletion detail', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{job-oncompletion-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#job-oncompletion-detail}}
      template block text
    {{/job-oncompletion-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
