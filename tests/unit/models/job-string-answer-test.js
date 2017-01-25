import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('job-string-answer', 'Unit | Model | job string answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('job-string-answer', {key: 'answer', kind: 'belongsTo', type: 'job-answer'});
