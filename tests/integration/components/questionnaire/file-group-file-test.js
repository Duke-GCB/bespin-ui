import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/file group file', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{questionnaire/file-group-file}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    await render(hbs`
      {{#questionnaire/file-group-file}}
        template block text
      {{/questionnaire/file-group-file}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });

  test('it calls supplied click action', async function(assert) {
    this.actions.clickHandler = function(index) {
      assert.equal(index, 42);
    };

    this.set('file', {});
    this.set('index', 42);
    await render(hbs`{{questionnaire/file-group-file file index (action 'clickHandler')}}`);
    this.$('.dds-remove-button').click();
  });
});
