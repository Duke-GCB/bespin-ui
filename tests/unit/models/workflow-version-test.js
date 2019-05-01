import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow-version', 'Unit | Model | workflow version', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow', 'model:job', 'model:job-questionnaire']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow-version', {key: 'workflow', kind: 'belongsTo', type: 'workflow'});
testRelationship('workflow-version', {key: 'methodsDocument', kind: 'belongsTo', type: 'workflow-methods-document'});
testRelationship('workflow-version', {key: 'toolDetails', kind: 'belongsTo', type: 'workflow-version-tool-detail'});
test('it calls getVersionInfo', function(assert) {
  assert.expect(3);
  const info  = {
    content: '# hello',
    content_type: 'text/plain'
  };
  const version = this.subject({id: 123});
  this.store().set('adapterFor', (modelName) => {
    assert.equal(modelName, 'workflow-version');
    return {
      getVersionInfo(versionId) {
        assert.equal(versionId, 123);
        return info;
      }
    }
  });
  assert.equal(version.getVersionInfo(), info);
});
