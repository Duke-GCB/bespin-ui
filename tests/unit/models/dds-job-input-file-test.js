import { moduleForModel, test } from 'ember-qunit';

moduleForModel('dds-job-input-file', 'Unit | Model | dds job input file', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
