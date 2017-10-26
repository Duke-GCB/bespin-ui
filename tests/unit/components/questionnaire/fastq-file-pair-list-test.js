import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-list', 'Unit | Component | questionnaire/fastq file pair list', {
  needs: ['service:dds-projects', 'service:dds-user-credentials'],
  unit: true
});


test('it records error when no pairs chosen', function(assert) {
  assert.expect(2);
  const empty = Ember.Object.create({ fastqFilePairs: [], isComplete: true });
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs1');
      assert.equal(errorText, 'Please choose at least 1 sample pair');
    },
    clearError(fieldName) {
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
  const incomplete = Ember.Object.create({ fastqFilePairs: [1], isComplete: false });
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
      assert.equal(fieldName, 'sample-pairs2');
      assert.equal(errorText, 'Please ensure all samples are paired');
    },
    clearError(fieldName) {
      assert.notOk(true); // clearError should not be called
    }
  });

  this.subject({
    fieldName: 'sample-pairs2',
    fileItems: incomplete,
    answerFormErrors: mockErrors
  });
});

test('it records no error when pairs complete', function(assert) {
  assert.expect(1);
  const complete = Ember.Object.create({ fastqFilePairs: [1,2,3,4], isComplete: true });
  const mockErrors = Ember.Object.create({
    setError(fieldName, errorText) {
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

