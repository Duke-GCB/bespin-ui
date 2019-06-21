import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

module('Integration | Component | questionnaire/file group list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
    this.store = this.owner.lookup('service:store');
    this.get('store').reset();
    this.set('store.queryFunction', function() {
      return [{name: 'file1.txt', kind: 'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}];
    });
  });

  test('it renders', async function(assert) {
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) }}`);
    assert.equal(this.$('.file-group-list-picker label').text().trim(), 'Pick your file pairs from Duke Data Service');
    assert.equal(this.$('.file-group-list-selections label').text().trim(), 'Selected file pairs');
  });

  test('it renders with GroupName', async function(assert) {
    this.set('externalAction', () => {});
    this.set('mysettings', EmberObject.create({groupName: 'sample'}));
    await render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) formatSettings=mysettings}}`);
    assert.equal(this.$('.file-group-list-picker label').text().trim(), 'Pick your sample pairs from Duke Data Service');
    assert.equal(this.$('.file-group-list-selections label').text().trim(), 'Selected sample pairs');
  });

  test('it toggles empty selection', function(assert) {
    this.set('externalAction', () => {});
    run(async () => {
      this.set('fileItems', EmberObject.create({
        fileItemGroups: []
      }));
      await render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) fileItems=fileItems}}`);

      assert.equal(this.$('.empty-selection').length, 1, 'with no groups, should show the empty-selection component');
      this.set('fileItems.fileItemGroups', [
        [
          {ddsFile: 'foo'},
        ]
      ]);
      await render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) fileItems=fileItems}}`);
      assert.equal(this.$('.empty-selection').length, 0, 'with groups, should hide the empty-selection component');
    });
  });
});
