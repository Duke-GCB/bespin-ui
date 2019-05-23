import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('questionnaire/fastq-read-pair-list', 'Unit | Component | questionnaire/fastq read pair list', {
  // Specify the other units that are required for this test
  needs: ['service:dds-projects', 'service:dds-user-credentials'],
  unit: true
});

test('it computes answer with field name and files', function (assert) {

  const expected = EmberObject.create({read_pairs: [{name: 'abc', read1_files: [{class: 'File', path: 'abc_1'}], read2_files: [{class: 'File', path: 'abc_2'}]}]});
  const fieldName = 'read_pairs';
  const mockFileItems = EmberObject.create({
    cwlObjectValue: [
      EmberObject.create({name: 'abc', file1: {class: 'File', path: 'abc_1'}, file2: {class: 'File', path: 'abc_2'}})
    ]
  });

  const fastqReadPairList = this.subject({
    groupSize: 2,
    fileItems: mockFileItems,
    fieldName: fieldName,
    answerChanged: () => {
    }
  });
  const answer = fastqReadPairList.get('answer');
  assert.equal(JSON.stringify(answer), JSON.stringify(expected));
});

test('it provides feature support message with link to bespin-cli', function(assert) {
  const fastqReadPairList = this.subject({fieldName: "SomeField", answerChanged: ()=>{}});
  const messageString = fastqReadPairList.get('featureSupportMessage.string');
  assert.ok(messageString.indexOf('https://github.com/Duke-GCB/bespin-cli') > 0);
});
