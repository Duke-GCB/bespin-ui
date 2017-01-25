import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('job-dds-file-answer', 'Unit | Model | job dds file answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:dds-project', 'model:dds-resource', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'answer', kind: 'belongsTo', type: 'job-answer'},
  {key: 'project', kind: 'belongsTo', type: 'dds-project'},
  {key: 'file', kind: 'belongsTo', type: 'dds-resource'},
  {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'}
];

testRelationships('job-dds-file-answer', testRels);
