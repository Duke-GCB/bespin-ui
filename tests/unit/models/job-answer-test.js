import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('job-answer', 'Unit | Model | job answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-question', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'questionnaire', kind: 'belongsTo', type: 'job-questionnaire'},
  {key: 'question', kind: 'belongsTo', type: 'job-question'},
];

testRelationships('job-answer', testRels);
