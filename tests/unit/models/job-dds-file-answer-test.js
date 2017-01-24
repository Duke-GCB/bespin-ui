import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job-dds-file-answer', 'Unit | Model | job dds file answer', {
  // Specify the other units that are required for this test.
  needs: ['model:job-answer', 'model:dds-project', 'model:dds-resource', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const testRels = [
  {key: 'answer', kind: 'belongsTo', type: 'job-answer'},
  {key: 'project', kind: 'belongsTo', type: 'dds-project'},
  {key: 'file', kind: 'belongsTo', type: 'dds-resource'},
  {key: 'ddsUserCredentials', kind: 'belongsTo', type: 'dds-user-credential'}
];

testRels.forEach(function(testRel) {
  test(`it ${testRel.kind}: ${testRel.type}`, function(assert) {
    const JobDDSFileAnswer = this.store().modelFor('job-dds-file-answer');
    const relationship = Ember.get(JobDDSFileAnswer, 'relationshipsByName').get(testRel.key);
    assert.equal(relationship.key, testRel.key, `has relationship with ${testRel.type}`);
    assert.equal(relationship.kind, testRel.kind, `kind of relationship is ${testRel.kind}`);
    assert.equal(relationship.type, testRel.type, `Type of related object is ${testRel.type}`);
  });
});
