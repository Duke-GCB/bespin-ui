import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-dds-output-directory-answer', 'Unit | Model | job dds output directory answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:dds-project', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
