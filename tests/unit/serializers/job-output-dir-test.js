import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-output-dir', 'Unit | Serializer | job output dir', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job-output-dir',
    'model:dds-project',
    'model:job',
    'model:dds-user-credential'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
