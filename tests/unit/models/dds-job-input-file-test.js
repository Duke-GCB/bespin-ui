import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | dds job input file', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('dds-job-input-file'));
    // let store = this.store();
    assert.ok(!!model);
  });

  const testRels = [
    {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'},
    {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'}
  ];

  testRelationships('dds-job-input-file', testRels);
});
