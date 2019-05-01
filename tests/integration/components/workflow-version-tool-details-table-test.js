import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-tool-details-table', 'Integration | Component | workflow version tool details table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflow-version-tool-details-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflow-version-tool-details-table}}
      template block text
    {{/workflow-version-tool-details-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
