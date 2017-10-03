import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-file-stage-group', 'Unit | Serializer | job file stage group', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job-file-stage-group',
    'model:dds-job-input-file',
    'model:url-job-input-file'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();
  let serializedRecord = record.serialize();
  assert.ok(serializedRecord);
});
