import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-detail-row', 'Integration | Component | workflow version detail row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflow-version-detail-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflow-version-detail-row}}
      template block text
    {{/workflow-version-detail-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
