import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('job-output-dir', 'Unit | Model | job output dir', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-project', 'model:job', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('job-output-dir', {key: 'job', kind: 'belongsTo', type: 'job'});
testRelationship('job-output-dir', {key: 'project', kind: 'belongsTo', type: 'dds-project'});
testRelationship('job-output-dir', {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'});
