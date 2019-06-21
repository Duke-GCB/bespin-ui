import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

module('Unit | Model | workflow version', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('workflow-version'));
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
    const version = run(() => this.owner.lookup('service:store').createRecord('workflow-version', {id: 123}));
    this.owner.lookup('service:store').set('adapterFor', (modelName) => {
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
    let version = run(() => this.owner.lookup('service:store').createRecord('workflow-version', {version: 'v3.2'}));
    run(() => {
      this.owner.lookup('service:store').createRecord('workflow', {
        tag: 'wf-tag',
        versions: [version]
      });
    });
    assert.equal(version.get('versionTag'),'wf-tag/v3.2');
  });
});
