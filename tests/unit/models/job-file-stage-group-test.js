import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | job file stage group', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-file-stage-group'));
    // let store = this.store();
    assert.ok(!!model);
  });

  const testRels = [
    {key: 'ddsFiles', kind: 'hasMany', type: 'dds-job-input-file'},
    {key: 'urlFiles', kind: 'hasMany', type: 'url-job-input-file'}
  ];

  testRelationships('job-file-stage-group', testRels);
});
