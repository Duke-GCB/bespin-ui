import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job-answer', 'Unit | Model | job answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-question', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it belongs to a job-questionnaire', function(assert) {
  const JobAnswer = this.store().modelFor('job-answer');
  const relationship = Ember.get(JobAnswer, 'relationshipsByName').get('questionnaire');
  assert.equal(relationship.key, 'questionnaire', 'has relationship with job-questionnaire');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'job-questionnaire', 'Type of related object is job-questionnaire');
});

test('it belongs to a job-question', function(assert) {
  const JobAnswer = this.store().modelFor('job-answer');
  const relationship = Ember.get(JobAnswer, 'relationshipsByName').get('question');
  assert.equal(relationship.key, 'question', 'has relationship with job-question');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  assert.equal(relationship.type, 'job-question', 'Type of related object is job-question');
});
