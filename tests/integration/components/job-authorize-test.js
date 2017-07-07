import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-authorize', 'Integration | Component | job authorize', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{job-authorize}}`);

  assert.equal(this.$().text().trim().replace(/\n/g,''), 'Enter job token:                Authorize');

  // Template block usage:
  this.render(hbs`
    {{#job-authorize}}
    {{/job-authorize}}
  `);

  assert.equal(this.$().text().trim().replace(/\n/g,''), 'Enter job token:                Authorize');
});
