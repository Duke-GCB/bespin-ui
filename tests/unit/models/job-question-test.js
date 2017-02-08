import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job-question', 'Unit | Model | job question', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes isFile', function(assert) {
  assert.expect(2);
  let model = this.subject();
  Ember.run(function() {
    model.set('dataType', 'File');
    assert.ok(model.get('isFile'));
    model.set('dataType', 'NotFile');
    assert.notOk(model.get('isFile'));
  });
});

test('it computes isString', function (assert) {
  assert.expect(2);
  let model = this.subject();
  Ember.run(function() {
    model.set('dataType', 'string');
    assert.ok(model.get('isString'));
    model.set('dataType', 'notString');
    assert.notOk(model.get('isString'));
  });
});

test('it computes isDirectory', function (assert) {
  assert.expect(2);
  let model = this.subject();
  Ember.run(function() {
    model.set('dataType', 'Directory');
    assert.ok(model.get('isDirectory'));
    model.set('dataType', 'notDirectory');
    assert.notOk(model.get('isDirectory'));
  });
});

test('it computes isString', function (assert) {
  assert.expect(2);
  let model = this.subject();
  Ember.run(function() {
    model.set('dataType', 'string');
    assert.ok(model.get('isString'));
    model.set('dataType', 'notString');
    assert.notOk(model.get('isString'));
  });
});


test('it computes userAnswerKind', function(assert) {
  assert.expect(4);
  let question = this.subject();
  Ember.run(() => {
    question.set('dataType', 'string');
    assert.equal(question.get('userAnswerKind'), 'string');
    question.set('dataType', 'int');
    assert.equal(question.get('userAnswerKind'), 'string');
    question.set('dataType', 'File');
    assert.equal(question.get('userAnswerKind'), 'dds_file');
    question.set('dataType', 'Directory');
    assert.equal(question.get('userAnswerKind'), 'dds_output_directory');
  });
});

test('it computes modelForUserAnswerValue', function(assert) {
  assert.expect(4);
  let question = this.subject();
  Ember.run(() => {
    question.set('dataType', 'string');
    assert.equal(question.get('modelForUserAnswerValue'), 'job-string-answer');
    question.set('dataType', 'int');
    assert.equal(question.get('modelForUserAnswerValue'), 'job-string-answer');
    question.set('dataType', 'File');
    assert.equal(question.get('modelForUserAnswerValue'), 'job-dds-file-answer');
    question.set('dataType', 'Directory');
    assert.equal(question.get('modelForUserAnswerValue'), 'job-dds-output-directory-answer');
  });
});
