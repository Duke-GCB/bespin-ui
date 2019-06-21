import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds resource node', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.set('resource', {name:'file.txt'});
    await render(hbs`{{dds/dds-resource-node resource}}`);
    assert.equal(this.$('.dds-resource-name').text().trim(), 'file.txt');
  });

  test('it sends action on click', async function(assert) {
    this.set('resource', {name:'file.txt'});
    await render(hbs`{{dds/dds-resource-node resource action='testAction'}}`);
    this.actions.testAction = function() { assert.ok(true); };
    this.$('.dds-resource-name').click();
  });
});
