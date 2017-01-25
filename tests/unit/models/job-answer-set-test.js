import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';
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

const testRels = [
  {key: 'questionnaire', kind: 'belongsTo', type: 'job-questionnaire'},
  {key: 'answers', kind: 'hasMany', type: 'job-answer'},
];

testRelationships('job-answer-set', testRels);

test('it has no inverse relationship to job-answers', function(assert) {
  const JobAnswerSet = this.store().modelFor('job-answer-set');
  const relationship = Ember.get(JobAnswerSet, 'relationshipsByName').get('answers');
  assert.equal(relationship.inverse, null, 'No inverse relationship');
});
