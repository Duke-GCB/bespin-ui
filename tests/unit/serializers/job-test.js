import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job', 'Unit | Serializer | job', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:job',
    'model:workflow-version',
    'model:job-dds-output-project',
    'model:job-error',
    'model:job-file-stage-group',
    'model:share-group',
    'transform:job-usage',
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject({jobErrors:[]});
  let serializedRecord = record.serialize();
  assert.ok(serializedRecord);
});
