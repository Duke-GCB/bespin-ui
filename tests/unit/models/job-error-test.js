import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-error', 'Unit | Model | job error', {
  // Specify the other units that are required for this test.
  needs: ['model:job']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
