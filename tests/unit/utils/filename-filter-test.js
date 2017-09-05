import FilenameFilter from 'bespin-ui/utils/filename-filter';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | filename filter');

test('it can filter files', function(assert) {
  let filenameFilter = FilenameFilter.create({fileNameRegexStr:'\\.zip$'});
  assert.ok(filenameFilter);
  assert.equal(true, filenameFilter.filter(Ember.Object.create({name: 'data.zip', isFile: true})));
  assert.equal(false, filenameFilter.filter(Ember.Object.create({name: 'datazip', isFile: true})));
  assert.equal(false, filenameFilter.filter(Ember.Object.create({name: 'data.zip.no', isFile: true})));
  assert.equal(true, filenameFilter.filter(Ember.Object.create({name: 'datazip', isFile: false})));
});
