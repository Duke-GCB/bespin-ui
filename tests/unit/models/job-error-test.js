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

test('it computes jobStep properties', function(assert) {
  assert.expect(10);
  const stepsAndProperties = [
    ['V', 'stepIsCreateVm'],
    ['S', 'stepIsStaging'],
    ['R', 'stepIsRunning'],
    ['O', 'stepIsStoreOutput'],
    ['T', 'stepIsTerminateVm'],
  ];

  let jobError = this.subject();

  Ember.run(() => {
    stepsAndProperties.forEach(function(stepAndProperty) {
      const step = stepAndProperty[0];
      const property = stepAndProperty[1];
      jobError.set('jobStep', '');
      assert.notOk(jobError.get(property), `${property} should be false when empty jobStep`);
      jobError.set('jobStep', step);
      assert.ok(jobError.get(property), `${property} should be true when jobStep ${step}`);
    });
  });
});
