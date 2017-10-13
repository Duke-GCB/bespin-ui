import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-dds-output-project', 'Unit | Serializer | job dds output project', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job-dds-output-project',
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
