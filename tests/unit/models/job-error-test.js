import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
import Ember from 'ember';

moduleForModel('job-error', 'Unit | Model | job error', {
  // Specify the other units that are required for this test.
  needs: ['model:job']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('job-error', {key: 'job', kind: 'belongsTo', type: 'job'});

test('it has no inverse relationship to job', function(assert) {
  const JobError = this.store().modelFor('job-error');
  const relationship = Ember.get(JobError, 'relationshipsByName').get('job');
  assert.equal(relationship.inverse, null, 'No inverse relationship');
});
