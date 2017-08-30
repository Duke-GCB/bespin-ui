import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-summary', 'Integration | Component | workflow version summary', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let version = {version: 99, description: 'Special version'};
  this.set('version', version);
  this.render(hbs`{{workflow-version-summary version}}`);

  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Special version');
  assert.equal(this.$('.workflow-version-summary-version').html(), 'v99');

  // Template block usage:
  this.render(hbs`
    {{#workflow-version-summary version}}
      <span class="child-content">template block text</span>
    {{/workflow-version-summary}}
  `);

  assert.equal(this.$('.child-content').text().trim(), 'template block text');
  assert.equal(this.$('.workflow-version-summary-version').text().trim(), '');
  assert.equal(this.$('.workflow-version-summary-description').text().trim(), 'Special version');
});


