import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job-answer-set', 'Unit | Model | job answer set', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it belongs to a job-questionnaire', function(assert) {
  const JobAnswerSet = this.store().modelFor('job-answer-set');
  const relationship = Ember.get(JobAnswerSet, 'relationshipsByName').get('questionnaire');
  assert.equal(relationship.key, 'questionnaire', 'has relationship with job-questionnaire');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'job-questionnaire', 'Type of related object is job-questionnaire');
});

test('it has many job-answers', function(assert) {
  const JobAnswerSet = this.store().modelFor('job-answer-set');
  const relationship = Ember.get(JobAnswerSet, 'relationshipsByName').get('answers');
  assert.equal(relationship.key, 'answers', 'has relationship with job-answer');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'job-answer', 'Type of related object is job-answer');
  assert.equal(relationship.inverse, null, 'No inverse relationship');

});
