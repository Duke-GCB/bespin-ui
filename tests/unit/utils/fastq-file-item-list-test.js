import FASTQFileItemList from 'bespin-ui/utils/fastq-file-item-list';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | fastq file item list');

function makeMockFileItem(name) {
  return Ember.Object.create({
    name: name,
    ddsFile: Ember.Object.create(
      {name: name, kind: 'dds-file'}
      ),
    cwlObject: {
      class: 'File',
      path: name
    }
  });
}

test('it calculates fastqFilePairs', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('abc1'));
  fileItemList.addFileItem(makeMockFileItem('abc2'));
  fileItemList.addFileItem(makeMockFileItem('def1'));
  fileItemList.addFileItem(makeMockFileItem('def2'));
  const expectedPairs = [
    {name: 'abc', file1: {name: 'abc1', kind: 'dds-file'}, file2: {name: 'abc2', kind: 'dds-file'}},
    {name: 'def', file1: {name: 'def1', kind: 'dds-file'}, file2: {name: 'def2', kind: 'dds-file'}}
    ];
  const calculatedPairs = fileItemList.get('fastqFilePairs');
  assert.equal(JSON.stringify(calculatedPairs), JSON.stringify(expectedPairs))
});

test('it calculates cwlObjectValue', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('abc1'));
  fileItemList.addFileItem(makeMockFileItem('abc2'));
  fileItemList.addFileItem(makeMockFileItem('def1'));
  fileItemList.addFileItem(makeMockFileItem('def2'));
  const expectedCWLObjectValue = [
    {name: 'abc', file1: {class: 'File', path: 'abc1'}, file2: {class: 'File', path: 'abc2'}},
    {name: 'def', file1: {class: 'File', path: 'def1'}, file2: {class: 'File', path: 'def2'}},
  ];
  const calculatedCWLObjectValue = fileItemList.get('cwlObjectValue');
  assert.equal(JSON.stringify(calculatedCWLObjectValue), JSON.stringify(expectedCWLObjectValue))
});
