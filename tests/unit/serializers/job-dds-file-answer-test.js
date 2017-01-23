import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-dds-file-answer', 'Unit | Serializer | job dds file answer', {
  // Specify the other units that are required for this test.
  needs: ['serializer:job-dds-file-answer']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
