import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-list', 'Unit | Component | questionnaire/fastq file pair list', {
  needs: ['service:dds-projects', 'service:dds-user-credentials'],
  unit: true
});

const MockFileItemList = Ember.Object.extend({
  // Default to everything's fine
  fastqFilePairs: null,
  isComplete: true,
  hasUniqueSampleNames: true,
  hasUnnamedSamples: false
});


test('it records error when no pairs chosen', function(assert) {
  assert.expect(2);
  const empty = MockFileItemList.create({fastqFilePairs: []});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs1');
      assert.equal(errorText, 'Please choose at least 1 sample pair.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs1',
    fileItems: empty,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs incomplete', function(assert) {
  assert.expect(2);
  const incomplete = MockFileItemList.create({fastqFilePairs: [1], isComplete: false});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs2');
      assert.equal(errorText, 'Please ensure all samples are paired.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs2',
    fileItems: incomplete,
    answerFormErrors: mockErrors
  });
});

test('it records no error when everything good', function(assert) {
  assert.expect(1);
  const complete = MockFileItemList.create();
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
    fileItems: complete,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs do not have unique sample names', function(assert) {
  assert.expect(2);
  const duplicates = MockFileItemList.create({fastqFilePairs: [1], hasUniqueSampleNames: false});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs4');
      assert.equal(errorText, 'Please ensure all pairs chosen have unique names.');
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs4',
    fileItems: duplicates,
    answerFormErrors: mockErrors
  });
});

test('it records error when pairs have unnamed samples', function(assert) {
  assert.expect(2);
  const unnamed = MockFileItemList.create({hasUnnamedSamples: true});
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs5');
      assert.equal(errorText.indexOf('Unable to determine sample names'), 0);
    },
    clearError(/* fieldName */) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs5',
    fileItems: unnamed,
    answerFormErrors: mockErrors
  });
});

