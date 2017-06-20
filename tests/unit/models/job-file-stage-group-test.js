import { moduleForModel, test } from 'ember-qunit';
import testRelationships from '../../helpers/test-relationships';

moduleForModel('job-file-stage-group', 'Unit | Model | job file stage group', {
  needs: ['model:dds-job-input-file', 'model:url-job-input-file']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'ddsFiles', kind: 'hasMany', type: 'dds-job-input-file'},
  {key: 'urlFiles', kind: 'hasMany', type: 'url-job-input-file'}
];

testRelationships('job-file-stage-group', testRels);
