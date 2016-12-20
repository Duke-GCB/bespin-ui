import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job', 'Unit | Serializer | job', {
  // Specify the other units that are required for this test.
  needs: ['serializer:job', 'model:workflow-version']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

// Tried to test the conversion of dash to underscore here but this is
// not exposed in serializer. I would think it would be simple to call record.normalize(), but no.
