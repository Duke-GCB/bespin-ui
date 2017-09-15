import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-summary-detail-row', 'Integration | Component | job summary detail row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{job-summary-detail-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#job-summary-detail-row}}
      template block text
    {{/job-summary-detail-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
