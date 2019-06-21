import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | item chooser/item picker detail row', function(hooks) {
  setupRenderingTest(hooks);


  test('it renders workflow details', async function(assert) {
    this.set('workflow', EmberObject.create({displayName: 'Workflow 123', selected: false}));
    await render(hbs`{{item-chooser/item-picker-detail-row workflow}}`);
    assert.equal(this.$('.item-title').text().trim(), 'Workflow 123');
  });

  test('it renders block content', async function(assert) {
    this.set('workflow', EmberObject.create({displayName:'Workflow 123', description: 'Sample workflow'}));
  // Template block usage:
    await render(hbs`
      {{#item-chooser/item-picker-detail-row workflow}}
        Block Content
      {{/item-chooser/item-picker-detail-row}}
    `);
    assert.equal(this.$('.item-content').text().trim(), 'Block Content');
  });


  test('it selects on click', async function(assert) {
    assert.expect(2);
    let workflow = EmberObject.create({displayName:'Workflow 123', description: 'Sample workflow'});
    this.set('workflow', workflow);
    this.set('onPick', function() {
      assert.ok(true, 'onPick was called');
    });
    await render(hbs`{{item-chooser/item-picker-detail-row workflow null onPick}}`);
    assert.notOk(this.$('input').get('checked'));
    this.$('label').click();
  });
});
