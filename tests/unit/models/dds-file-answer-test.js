import { moduleForModel, test } from 'ember-qunit';

moduleForModel('dds-file-answer', 'Unit | Model | dds file answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:dds-project', 'model:dds-resource']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});