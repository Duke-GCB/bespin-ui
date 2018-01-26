import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Unit | Component | questionnaire/fastq file pair row', {
  unit: true
});

const MockPair = Ember.Object.extend({
  sampleName: null,
  size: 2,
  isFull: false,
  userSetSampleName: false
});

function renderAndCheckError(name, mockPairParams, expectedErrorMessage) {
  test(name, function(assert) {
    const pair = MockPair.create(mockPairParams);
    const component = this.subject({pair: pair});
    const errors = component.get('errors');
    assert.equal(errors.get('firstObject.message'), expectedErrorMessage);
  });
}

renderAndCheckError(
  'it renders error when sample is not full and name has not been set',
  {userSetSampleName: false, isFull: false},
  'Please select 2 files to detect sample name.'
);

renderAndCheckError(
  'it renders error when sample is not full and name has been set',
  {userSetSampleName: true, isFull: false},
  'Please select 2 files.'
);

renderAndCheckError(
  'it renders error when sample is full and name cannot be detected',
  {userSetSampleName: false, isFull: true},
  'No sample name could be detected. Please enter a sample name.'
);

renderAndCheckError(
  'it renders error when user set empty sample name',
  {userSetSampleName: true, name: '', isFull: true},
  'Please enter a sample name.'
);

renderAndCheckError(
  'it renders no error when sample is full and name has been detected',
  {userSetSampleName: false, isFull: true, sampleName: 'detected'},
  undefined
);

renderAndCheckError(
  'it renders no error when sample is full and has been set',
  {userSetSampleName: true, isFull: true, sampleName: 'user'},
  undefined
);
