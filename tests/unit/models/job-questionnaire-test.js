import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('job-questionnaire', 'Unit | Model | job questionnaire', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version', 'model:job-question']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});


const testRels = [
  {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'},
  {key: 'questions', kind: 'hasMany', type: 'job-question'},
];

testRelationships('job-questionnaire', testRels);
