import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Unit | Component | questionnaire/fastq file pair row', {
  unit: true
});

test('it renders error message for empty file in pair', function(assert) {
  const pair = Ember.Object.create({ file1: 'file1', file2: null, name: null });
  const component = this.subject({pair: pair});
  const errors = component.get('errors');
  assert.equal(errors[0].get('message'), 'Select two files to detect sample name.');
});

test('it renders error message for empty name in pair', function(assert) {
  const pair = Ember.Object.create({ file1: 'file1', file2: 'file2', name: null });
  const component = this.subject({pair: pair});
  const errors = component.get('errors');
  assert.equal(errors[0].get('message'), 'No sample name detected. File names must begin with a common name to detect sample name.');
});
