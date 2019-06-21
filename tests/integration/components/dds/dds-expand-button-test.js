import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds expand button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{dds/dds-expand-button}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    await render(hbs`
      {{#dds/dds-expand-button}}
        template block text
      {{/dds/dds-expand-button}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });

  test('it is not expanded by default', async function(assert) {
    await render(hbs`{{dds/dds-expand-button}}`);
    assert.equal(this.$('span.glyphicon-folder-open').length, 0);
  });

  test('it binds class name to expanded state', async function(assert) {
    assert.expect(4);
    await render(hbs`{{dds/dds-expand-button true}}`);
    assert.equal(this.$('span.glyphicon-folder-open').length, 1);
    assert.equal(this.$('span.glyphicon-folder-close').length, 0);
    await render(hbs`{{dds/dds-expand-button false}}`);
    assert.equal(this.$('span.glyphicon-folder-open').length, 0);
    assert.equal(this.$('span.glyphicon-folder-close').length, 1);
  });

  test('it sends action on click', async function(assert) {
    this.actions.clicked = function() {
      assert.ok(true);
    };
    await render(hbs`{{dds/dds-expand-button action="clicked"}}`);
    this.$('span.dds-expand-button').click();
  });
});
