import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

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
  this.render(hbs`{{questionnaire/file-group-list}}`);
  assert.equal(this.$('.file-group-list-picker h5').text().trim(), 'Pick your read pairs from Duke Data Service');
  assert.equal(this.$('.file-group-list-selections h5').text().trim(), 'Selected read pairs');
});

test('it computes groups from file array', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it computes answer with field name and files', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it computes inputFiles array from groups, matching names of files', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it handles removeAt action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});

test('it handles addFile action', function (assert) {
  assert.ok(false, 'Not yet implemented');
});
