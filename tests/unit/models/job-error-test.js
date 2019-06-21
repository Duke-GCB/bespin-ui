import { run } from '@ember/runloop';
import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

module('Unit | Model | job error', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-error'));
    // let store = this.store();
    assert.ok(!!model);
  });

  testRelationship('job-error', {key: 'job', kind: 'belongsTo', type: 'job'});

  test('it has no inverse relationship to job', function(assert) {
    const JobError = this.owner.lookup('service:store').modelFor('job-error');
    const relationship = get(JobError, 'relationshipsByName').get('job');
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

    let jobError = run(() => this.owner.lookup('service:store').createRecord('job-error'));

    run(() => {
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
});
