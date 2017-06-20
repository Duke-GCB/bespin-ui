import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('url-job-input-file', 'Unit | Model | url job input file', {
  // Specify the other units that are required for this test.
  needs: ['model:job-file-stage-group']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'stageGroup', kind: 'belongsTo', type: 'job-file-stage-group'}
];

testRelationships('url-job-input-file', testRels);
