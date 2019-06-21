import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | job questionnaire', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-questionnaire'));
    // let store = this.store();
    assert.ok(!!model);
  });


  const testRels = [
    {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'},
    {key: 'vmFlavor', kind: 'belongsTo', type: 'vm-flavor'},
    {key: 'vmProject', kind: 'belongsTo', type: 'vm-project'}
  ];

  testRelationships('job-questionnaire', testRels);
});
