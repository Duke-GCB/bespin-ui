import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('dds-job-input-file', 'Unit | Model | dds job input file', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-user-credential', 'model:job-file-stage-group']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'},
  {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'}
];

testRelationships('dds-job-input-file', testRels);
