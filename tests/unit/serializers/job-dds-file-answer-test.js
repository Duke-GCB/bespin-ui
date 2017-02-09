import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-dds-file-answer', 'Unit | Serializer | job dds file answer', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job-dds-file-answer',
    'model:job-answer',
    'model:dds-project',
    'model:dds-resource',
    'model:dds-user-credential',
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();
  let serializedRecord = record.serialize();
  assert.ok(serializedRecord);
});
