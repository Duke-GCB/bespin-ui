import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('job-questionnaire', 'Unit | Model | job questionnaire', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version', 'model:vm-flavor', 'model:vm-project']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});


const testRels = [
  {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'},
  {key: 'vmFlavor', kind: 'belongsTo', type: 'vm-flavor'},
  {key: 'vmProject', kind: 'belongsTo', type: 'vm-project'}
];

testRelationships('job-questionnaire', testRels);

test('it parses system job order JSON', function(assert) {
  let payload = {key1: 'value1'};
  let questionnaire = this.subject({systemJobOrderJson: JSON.stringify(payload)});
  assert.deepEqual(questionnaire.get('systemJobOrder'), payload);
});

test('it parses userFields array JSON', function (assert) {
  let payload = ['field1','field2','field3'];
  let questionnaire = this.subject({userFieldsJson: JSON.stringify(payload)});
  assert.deepEqual(questionnaire.get('userFieldsArray'), payload);
});
