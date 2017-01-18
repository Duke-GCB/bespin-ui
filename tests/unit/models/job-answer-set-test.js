import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-answer-set', 'Unit | Model | job answer set', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
