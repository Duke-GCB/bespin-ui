import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';
import Ember from 'ember';

moduleForComponent('questionnaire/file-group-list', 'Integration | Component | questionnaire/file group list', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
    this.get('store').reset();
    this.set('store.queryFunction', function() {
      return [{name: 'file1.txt', kind: 'dds-file'}, {name: 'file2.txt', kind: 'dds-file'}];
    });
  }
});

test('it renders', function(assert) {
  this.set('externalAction', () => {});
  this.render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) }}`);
  assert.equal(this.$('.file-group-list-picker label').text().trim(), 'Pick your file pairs from Duke Data Service');
  assert.equal(this.$('.file-group-list-selections label').text().trim(), 'Selected file pairs');
});

test('it renders with GroupName', function(assert) {
  this.set('externalAction', () => {});
  this.set('mysettings', Ember.Object.create({groupName: 'sample'}));
  this.render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) formatSettings=mysettings}}`);
  assert.equal(this.$('.file-group-list-picker label').text().trim(), 'Pick your sample pairs from Duke Data Service');
  assert.equal(this.$('.file-group-list-selections label').text().trim(), 'Selected sample pairs');
});

test('it toggles empty selection', function(assert) {
  this.set('externalAction', () => {});
  Ember.run(() => {
    this.set('fileItems', Ember.Object.create({
      fileItemGroups: []
    }));
    this.render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) fileItems=fileItems}}`);

    assert.equal(this.$('.empty-selection').length, 1, 'with no groups, should show the empty-selection component');
    this.set('fileItems.fileItemGroups', [
      [
        {ddsFile: 'foo'},
      ]
    ]);
    this.render(hbs`{{questionnaire/file-group-list "SomeField" (action externalAction) fileItems=fileItems}}`);
    assert.equal(this.$('.empty-selection').length, 0, 'with groups, should hide the empty-selection component');
  });
});
