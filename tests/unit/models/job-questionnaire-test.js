import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-questionnaire', 'Unit | Model | job questionnaire', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version', 'model:job-question']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
