import { FASTQFileItemList, extractSampleName, splitMultipleSeparators } from 'bespin-ui/utils/fastq-file-item-list';
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
  fileItemList.addFileItem(makeMockFileItem('abc_1'));
  fileItemList.addFileItem(makeMockFileItem('abc_2'));
  fileItemList.addFileItem(makeMockFileItem('def_1'));
  fileItemList.addFileItem(makeMockFileItem('def_2'));
  const expectedPairs = [
    {name: 'abc', file1: {name: 'abc_1', kind: 'dds-file'}, file2: {name: 'abc_2', kind: 'dds-file'}},
    {name: 'def', file1: {name: 'def_1', kind: 'dds-file'}, file2: {name: 'def_2', kind: 'dds-file'}}
    ];
  const calculatedPairs = fileItemList.get('fastqFilePairs');
  assert.equal(JSON.stringify(calculatedPairs), JSON.stringify(expectedPairs))
});

test('it calculates cwlObjectValue', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('abc_1'));
  fileItemList.addFileItem(makeMockFileItem('abc_2'));
  fileItemList.addFileItem(makeMockFileItem('def_1'));
  fileItemList.addFileItem(makeMockFileItem('def_2'));
  const expectedCWLObjectValue = [
    {name: 'abc', file1: {class: 'File', path: 'abc_1'}, file2: {class: 'File', path: 'abc_2'}},
    {name: 'def', file1: {class: 'File', path: 'def_1'}, file2: {class: 'File', path: 'def_2'}},
  ];
  const calculatedCWLObjectValue = fileItemList.get('cwlObjectValue');
  assert.equal(JSON.stringify(calculatedCWLObjectValue), JSON.stringify(expectedCWLObjectValue))
});

test('it extracts sample names with delimiter', function(assert) {
  const delimiters = [' ','_', '-'];
  assert.equal(extractSampleName('SA1234_XYZ_R2.fastq.gz', delimiters),'SA1234');
  assert.equal(extractSampleName('SA1234-XYZ_R2.fastq.gz', delimiters),'SA1234');
  assert.equal(extractSampleName('SA1234 XYZ_R2.fastq.gz', delimiters),'SA1234');
});

test('It recalculates sample name as files are added', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('AB1234_L001_R1.fastq'));
  assert.equal(fileItemList.get('fastqFilePairs')[0].get('name'), ''); // initially no common prefix since only one file
  fileItemList.addFileItem(makeMockFileItem('AB1234_L001_R2.fastq'));
  assert.equal(fileItemList.get('fastqFilePairs')[0].get('name'), 'AB1234');
});

test('It sets empty sample name when no match before delimiter', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('SA04059_S3_L007_R2_001.fastq.gz'));
  fileItemList.addFileItem(makeMockFileItem('SA03505_S1_L007_R2_001.fastq.gz'));
  assert.equal(fileItemList.get('fastqFilePairs')[0].get('name'), '');
});

test('it calculates isComplete', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  Ember.run(() => {
    // First, check an empty list
    assert.equal(fileItemList.get('fastqFilePairs.length'), 0);
    assert.ok(fileItemList.get('isComplete')); // Empty list should be complete

    // Now, add a single item. list should not be complete since group size is 2
    fileItemList.addFileItem(makeMockFileItem('abc1'));
    assert.equal(fileItemList.get('groupSize'), 2); // 2 = pair
    assert.equal(fileItemList.get('fastqFilePairs.length'), 1); // 1 pair
    assert.notOk(fileItemList.get('isComplete')); // not complete

    // Add a second item, list should be complete
    fileItemList.addFileItem(makeMockFileItem('def2'));
    assert.equal(fileItemList.get('fastqFilePairs.length'), 1); // still 1 pair
    assert.ok(fileItemList.get('isComplete')); // complete

    // Remove the item, list should again be incomplete
    fileItemList.removeFileItem(0, 0);
    assert.notOk(fileItemList.get('isComplete')); // not complete

    // Add 3 more, list should be complete again
    fileItemList.addFileItem(makeMockFileItem('ghi3'));
    fileItemList.addFileItem(makeMockFileItem('jkl4'));
    fileItemList.addFileItem(makeMockFileItem('mno5'));
    assert.ok(fileItemList.get('isComplete')); // complete
  });
});

test('it calculates hasUniqueSampleNames', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  Ember.run(() => {
    // First, check an empty list
    assert.equal(fileItemList.get('fastqFilePairs.length'), 0);
    assert.ok(fileItemList.get('hasUniqueSampleNames')); // Empty list should count as unique names

    // Add two files to make one sample
    fileItemList.addFileItem(makeMockFileItem('sample1_A'));
    fileItemList.addFileItem(makeMockFileItem('sample1_B'));
    assert.ok(fileItemList.get('hasUniqueSampleNames'));

    // Add two more files to make another sample
    fileItemList.addFileItem(makeMockFileItem('sample2_C'));
    fileItemList.addFileItem(makeMockFileItem('sample2_D'));
    assert.ok(fileItemList.get('hasUniqueSampleNames'));

    // Add another file with a conflicting sample name
    fileItemList.addFileItem(makeMockFileItem('sample1_F'));
    fileItemList.addFileItem(makeMockFileItem('sample1_F'));
    assert.notOk(fileItemList.get('hasUniqueSampleNames'));
  });
});

test('splitMultipleSeparators splits on multiple separators', function(assert) {
  const name = 'A_B-C.D';
  const separators = ['_','-','.'];
  const split = splitMultipleSeparators(name, separators);
  assert.deepEqual(split, ['A','B','C','D']);
});

test('splitMultipleSeparators splits on single separator', function(assert) {
  const name = 'A+B+C+D';
  const separators = ['+'];
  const split = splitMultipleSeparators(name, separators);
  assert.deepEqual(split, ['A','B','C','D']);
});

test('splitMultipleSeparators returns original string with no separator', function(assert) {
  const name = 'A+B+C+D';
  const separators = [];
  const split = splitMultipleSeparators(name, separators);
  assert.deepEqual(split, ['A+B+C+D']);
});

test('splitMultipleSeparators handles null separators field', function(assert) {
  const name = 'A+B+C+D';
  const split = splitMultipleSeparators(name);
  assert.deepEqual(split, ['A+B+C+D']);
});
