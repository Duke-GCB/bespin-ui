import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('job-dds-output-project', 'Unit | Model | job dds output project', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-project', 'model:job', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testRelationship('job-dds-output-project', {key: 'job', kind: 'belongsTo', type: 'job'});
testRelationship('job-dds-output-project', {key: 'project', kind: 'belongsTo', type: 'dds-project'});
testRelationship('job-dds-output-project', {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'});
