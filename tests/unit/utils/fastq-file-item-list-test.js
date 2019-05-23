import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import {
  FASTQFileItemList,
  FASTQSample,
  extractSampleName,
  splitMultipleSeparators
} from 'bespin-ui/utils/fastq-file-item-list';
import { module, test } from 'qunit';

module('Unit | Utility | fastq file item list');

function makeMockFileItem(name) {
  return EmberObject.create({
    name: name,
    ddsFile: EmberObject.create(
      {name: name, kind: 'dds-file'}
      ),
    cwlObject: {
      class: 'File',
      path: name
    }
  });
}

test('it calculates ddsFiles', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('abc_1'));
  fileItemList.addFileItem(makeMockFileItem('abc_2'));
  fileItemList.addFileItem(makeMockFileItem('def_1'));
  fileItemList.addFileItem(makeMockFileItem('def_2'));
  const expectedDdsFiles = [
    {name: 'abc_1', kind: 'dds-file'},
    {name: 'abc_2', kind: 'dds-file'},
    {name: 'def_1', kind: 'dds-file'},
    {name: 'def_2', kind: 'dds-file'}
    ];
  const calculatedDdsFiles = fileItemList.get('ddsFiles');
  assert.equal(JSON.stringify(calculatedDdsFiles), JSON.stringify(expectedDdsFiles ))
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
  assert.notOk(fileItemList.get('samples')[0].get('sampleName')); // initially no common prefix since only one file
  fileItemList.addFileItem(makeMockFileItem('AB1234_L001_R2.fastq'));
  assert.equal(fileItemList.get('samples')[0].get('sampleName'), 'AB1234');
});

test('It sets empty sample name when no match before delimiter', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  fileItemList.addFileItem(makeMockFileItem('SA04059_S3_L007_R2_001.fastq.gz'));
  fileItemList.addFileItem(makeMockFileItem('SA03505_S1_L007_R2_001.fastq.gz'));
  assert.notOk(fileItemList.get('samples')[0].get('sampleName'));
});

test('it calculates isComplete', function(assert) {
  let fileItemList = FASTQFileItemList.create();
  run(() => {
    // First, check an empty list
    assert.equal(fileItemList.get('samples.length'), 0);
    assert.ok(fileItemList.get('isComplete')); // Empty list should be complete

    // Now, add a single item. list should not be complete since group size is 2
    fileItemList.addFileItem(makeMockFileItem('abc1'));
    assert.equal(fileItemList.get('filesPerSample'), 2); // 2 = pair
    assert.equal(fileItemList.get('samples.length'), 1); // 1 pair
    assert.notOk(fileItemList.get('isComplete')); // not complete

    // Add a second item, list should be complete
    fileItemList.addFileItem(makeMockFileItem('def2'));
    assert.equal(fileItemList.get('samples.length'), 1); // still 1 pair
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
  run(() => {
    // First, check an empty list
    assert.equal(fileItemList.get('samples.length'), 0);
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

test('FASTQFileItemList removeFileItem does slicing and dicing', function(assert) {
  const list = FASTQFileItemList.create();
  list.addFileItem(makeMockFileItem('sampleA_1.fa'));
  list.addFileItem(makeMockFileItem('sampleA_2.fa'));
  const outlier = makeMockFileItem('sampleX_1.fa');
  list.addFileItem(outlier);
  list.addFileItem(makeMockFileItem('sampleB_1.fa'));
  list.addFileItem(makeMockFileItem('sampleB_2.fa'));

  assert.equal(list.get('ddsFiles.length'), 5);

  // Verify the sample at index 1 has the outlier and name generation failed
  let sample = list.get('samples')[1];
  assert.equal(sample.get('fileItems')[0].get('name'), 'sampleX_1.fa');
  assert.equal(sample.get('fileItems')[1].get('name'), 'sampleB_1.fa');
  assert.notOk(sample.get('sampleName'));
  assert.ok(list.removeFileItem(1, 0)); // remove sampleX_1
  assert.equal(list.get('ddsFiles.length'), 4);

  sample = list.get('samples')[1];
  assert.equal(sample.get('fileItems')[0].get('name'), 'sampleB_1.fa');
  assert.equal(sample.get('fileItems')[1].get('name'), 'sampleB_2.fa');
  assert.equal(sample.get('sampleName'), 'sampleB');
});

test('FASTQFileItemList removes empty samples', function(assert) {
  const emptySample = FASTQSample.create();
  const sample = FASTQSample.create();
  sample.addFileItem(makeMockFileItem('sample.fa'));
  const list = FASTQFileItemList.create({samples: [sample, emptySample]});
  assert.equal(list.get('samples.length'), 2);
  list.removeEmptySamples();
  assert.equal(list.get('samples.length'), 1);
});

test('FASTQFileItemList removeFromIndex', function(assert) {
  const list = FASTQFileItemList.create();
  list.addFileItem(makeMockFileItem('sampleA_1.fa'));
  list.addFileItem(makeMockFileItem('sampleA_2.fa'));
  list.addFileItem(makeMockFileItem('sampleB_1.fa'));
  list.addFileItem(makeMockFileItem('sampleB_2.fa'));
  assert.equal(list.get('samples.length'), 2);
  list.removeFromIndex(1);
  assert.equal(list.get('samples.length'), 1);
});

test('FASTQFileItemList includesFileItem', function(assert) {
  const list = FASTQFileItemList.create();
  const item = makeMockFileItem('sampleA_1.fa')
  assert.notOk(list.includesFileItem(item));
  assert.ok(list.addFileItem(item));
  assert.ok(list.includesFileItem(item));
});

test('FASTQFileItemList honors enforceUniqueness', function(assert) {
  const item = makeMockFileItem('sample.fa');
  const uniqueList = FASTQFileItemList.create({enforceUniqueness: true});
  assert.ok(uniqueList.addFileItem(item));
  assert.notOk(uniqueList.addFileItem(item));
  assert.equal(uniqueList.get('ddsFiles.length'), 1);

  const nonUniqueList = FASTQFileItemList.create({enforceUniqueness: false});
  assert.ok(nonUniqueList.addFileItem(item));
  assert.ok(nonUniqueList.addFileItem(item));
  assert.equal(nonUniqueList.get('ddsFiles.length'), 2);
});

test('FASTQSample generates sampleName when full', function(assert) {
  const sample = FASTQSample.create();
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  assert.notOk(sample.get('sampleName')); // Not generated yet
  assert.notOk(sample.get('isFull'));
  sample.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.equal(sample.get('sampleName'), 'sample');
  assert.ok(sample.get('isFull'));
});

test('FASTQSample honors generateSampleName to generate names', function(assert) {
  const sample_generate = FASTQSample.create({generateSampleNames: true});
  sample_generate.addFileItem(makeMockFileItem('sample_A.fa'));
  sample_generate.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.equal(sample_generate.get('sampleName'), 'sample');

  const sample_no_generate = FASTQSample.create({generateSampleNames: false});
  sample_no_generate.addFileItem(makeMockFileItem('sample_A.fa'));
  sample_no_generate.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.notOk(sample_no_generate.get('sampleName'));
});

test('FASTQSample does not generate sample name when user set', function(assert) {
  const sample = FASTQSample.create();
  sample.set('sampleName', 'user_provided');
  assert.equal(sample.get('sampleName'), 'user_provided');
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  assert.equal(sample.get('sampleName'), 'user_provided');
  sample.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.equal(sample.get('sampleName'), 'user_provided');
  assert.ok(sample.get('isFull'));
});

test('FASTQSample calculates isFull', function(assert) {
  const sample = FASTQSample.create({size: 3});
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  assert.notOk(sample.get('isFull'));
  sample.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.notOk(sample.get('isFull'));
  sample.addFileItem(makeMockFileItem('sample_C.fa'));
  assert.ok(sample.get('isFull'));
});

test('FASTQSample calculates isEmpty', function(assert) {
  const sample = FASTQSample.create({size: 3});
  assert.ok(sample.get('isEmpty'));
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  assert.notOk(sample.get('isEmpty'));
});

test('FASTQSample addFileItem succeeds until full', function(assert) {
  const sample = FASTQSample.create({size: 2});
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  sample.addFileItem(makeMockFileItem('sample_B.fa'));
  assert.ok(sample.get('isFull'));
  assert.equal(sample.get('fileItemsLength'), 2);
  const added = sample.addFileItem(makeMockFileItem('sample_C.fa'));
  assert.notOk(added);
  assert.equal(sample.get('fileItemsLength'), 2);
});

test('FASTQSample checks array membership (indexOfFileItem) by ddsFile equality', function(assert) {
  // Create two distinct FileItems that share a ddsFile, and a third that shares nothing
  const ddsFile = EmberObject.create({name: 'findMe', kind: 'dds-file'});
  const fileName = 'sample.fa';
  const item1 = makeMockFileItem(fileName);
  const item2 = makeMockFileItem(fileName);
  const item3 = makeMockFileItem(fileName);
  item1.set('ddsFile', ddsFile);
  item2.set('ddsFile', ddsFile);
  assert.notEqual(item1, item2); // These are different objects even though they have the same file names and ddsFile
  assert.notEqual(item1, item3); // These are differnt objects even though they have the same file name

  const sample = FASTQSample.create();
  sample.addFileItem(item1);

  // indexOfFileItem finds item1 because the object has been added
  assert.equal(sample.indexOfFileItem(item1), 0);
  // indexOfFileItem finds item2 because it shares a ddsFile with item1
  assert.equal(sample.indexOfFileItem(item2), 0);
  // indexOfFileItem does not find item3 because it is a different object with a different ddsFIle
  assert.equal(sample.indexOfFileItem(item3), -1);
});

test('FASTQSample removeFileItem by object', function(assert) {
  const sample = FASTQSample.create({size: 2});
  const item1 = makeMockFileItem('sample_A.fa');
  const item2 = makeMockFileItem('sample_B.fa');
  sample.addFileItem(item1);
  sample.addFileItem(item2);
  assert.ok(sample.get('isFull'));
  const removedIndex = sample.removeFileItem(item1);
  assert.equal(removedIndex, 0);
  assert.notOk(sample.get('isFull'));
});

test('FASTQSample removeFromIndex', function(assert) {
  const sample = FASTQSample.create({size: 3});
  sample.addFileItem(makeMockFileItem('sample_A.fa'));
  sample.addFileItem(makeMockFileItem('sample_B.fa'));
  sample.addFileItem(makeMockFileItem('sample_C.fa'));

  sample.removeFromIndex(2);
  assert.equal(sample.get('fileItemsLength'), 2);
});
