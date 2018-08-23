import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-list', 'Unit | Component | questionnaire/fastq file pair list', {
  needs: ['service:dds-projects', 'service:dds-user-credentials'],
  unit: true
});

const MockFASTQFileItemList = Ember.Object.extend({
  // Default to everything's fine
  samples: null,
  isComplete: true,
  hasUniqueSampleNames: true,
  hasUnnamedSamples: false
});


test('it records error when no pairs chosen', function(assert) {
  assert.expect(2);
  const empty = MockFASTQFileItemList.create({samples: []});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs1');
      assert.equal(errorText, 'No files chosen. Please choose at least 2 files.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs1',
    answerChanged: ()=>{},
    fileItems: empty,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs incomplete', function(assert) {
  assert.expect(2);
  const incomplete = MockFASTQFileItemList.create({samples: [{}], isComplete: false});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs2');
      assert.equal(errorText, 'Some samples are incomplete. Please ensure all samples have 2 files.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs2',
    answerChanged: ()=>{},
    fileItems: incomplete,
    answerFormErrors: mockErrors
  });
});

test('it records no error when everything good', function(assert) {
  assert.expect(1);
  const complete = MockFASTQFileItemList.create();
  const mockErrors = Ember.Object.create({
    setError(/* fieldName, errorText */) {
      assert.notOk(true); // Should not call this!
    },
    clearError(fieldName) {
      assert.equal(fieldName, 'sample-pairs3');
    }
  });

  this.subject({
    fieldName: 'sample-pairs3',
    answerChanged: ()=>{},
    fileItems: complete,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs do not have unique sample names', function(assert) {
  assert.expect(2);
  const duplicates = MockFASTQFileItemList.create({samples: [{}], hasUniqueSampleNames: false});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs4');
      assert.equal(errorText, 'Some samples have duplicate names. Please edit the sample names to ensure each is unique.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs4',
    answerChanged: ()=>{},
    fileItems: duplicates,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs have unnamed samples', function(assert) {
  assert.expect(2);
  const unnamed = MockFASTQFileItemList.create({hasUnnamedSamples: true});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs5');
      assert.equal(errorText, 'Some samples have blank names. Please edit the sample names.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs5',
    answerChanged: ()=>{},
    fileItems: unnamed,
    answerFormErrors: mockErrors
  });
});

test('it requires fieldName and answerChanged', function(assert) {
  assert.throws(() => {
    this.subject({});
  });
  assert.throws(() => {
    this.subject({fieldName: "SomeField"});
  });
  assert.throws(() => {
    this.subject({answerChanged: ()=>{}});
  });
  this.subject({fieldName: "SomeField", answerChanged: ()=>{}});
});
