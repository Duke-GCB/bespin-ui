import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflows/workflow-version-detail', 'Integration | Component | workflows/workflow version detail', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{workflows/workflow-version-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#workflows/workflow-version-detail}}
      template block text
    {{/workflows/workflow-version-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
