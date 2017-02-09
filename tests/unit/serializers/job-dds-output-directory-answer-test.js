import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-dds-output-directory-answer', 'Unit | Serializer | job dds output directory answer', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job-dds-output-directory-answer',
    'model:job-answer',
    'model:dds-project',
    'model:dds-user-credential',
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();
  let serializedRecord = record.serialize();
  assert.ok(serializedRecord);
});
