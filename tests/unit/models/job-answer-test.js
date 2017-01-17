import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-answer', 'Unit | Model | job answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-question', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
