import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
import Ember from 'ember';

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

test('it computes versionTag', function(assert) {
  let version = this.subject({version: 'v3.2'});
  Ember.run(() => {
    this.store().createRecord('workflow', {
      tag: 'wf-tag',
      versions: [version]
    });
  });
  assert.equal(version.get('versionTag'),'wf-tag/v3.2');
});

test('it computes versionSort for empty', function(assert) {
  assert.deepEqual(this.subject({version: ''}).get('versionSort'),null);
});

test('it computes versionSort for simple version', function(assert) {
  assert.deepEqual(this.subject({version: 'v1'}).get('versionSort'),['00000000v1']);
});

test('it computes versionSort for major.minor.patch version', function(assert) {
  let version = this.subject({version: 'v1.2.3'});
  assert.deepEqual(version.get('versionSort'),['00000000v1','0000000002','0000000003']);
});

test('it computes versionSort for major.minor.patch-dev version', function(assert) {
  let version = this.subject({version: 'v1.2.3-dev'});
  assert.deepEqual(version.get('versionSort'),['00000000v1','0000000002','0000000003','0000000dev']);
});
