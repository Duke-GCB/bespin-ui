import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | job dds output project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('job-dds-output-project'));
    assert.ok(!!model);
  });

  testRelationship('job-dds-output-project', {key: 'job', kind: 'belongsTo', type: 'job'});
  testRelationship('job-dds-output-project', {key: 'project', kind: 'belongsTo', type: 'dds-project'});
  testRelationship('job-dds-output-project', {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'});
});
