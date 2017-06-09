import ddsFileWrapper from 'bespin-ui/utils/dds-file-wrapper';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | dds file wrapper');

// Replace this with your real tests.
test('it wraps a dds-file like object in a structure', function(assert) {
  const ddsFile = Ember.Object.create({name: 'myfile.txt'});
  const wrapped = ddsFileWrapper(ddsFile, 1);
  assert.ok(wrapped);
  const expected = {
    class: 'File',
    path : '1_myfile.txt'
  };
  assert.deepEqual(expected, wrapped);
});

test('It works with map', function (assert) {
  const files = [
    Ember.Object.create({name: 'file1.txt'}),
    Ember.Object.create({name: 'file2.txt'}),
    Ember.Object.create({name: 'file3.txt'}),
  ];
  const wrapped = files.map(ddsFileWrapper);
  const expected = [
    {
      class: 'File',
      path : '0_file1.txt'
    },
    {
      class: 'File',
      path : '1_file2.txt'
    },
    {
      class: 'File',
      path : '2_file3.txt'
    }
  ];
  assert.deepEqual(expected, wrapped);
});
