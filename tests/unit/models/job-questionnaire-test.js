import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

/*
TEST:
 systemJobOrder: DS.attr('string'), // This is JSON
 userFields: DS.attr('string'), // This is JSON
 vmFlavor: DS.belongsTo('vm-flavor'),
 vmProject: DS.belongsTo('vm-project')

 */

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
];

testRelationships('job-questionnaire', testRels);
