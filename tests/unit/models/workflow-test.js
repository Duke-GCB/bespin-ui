import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

module('Unit | Model | workflow', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('workflow'));
    // let store = this.store();
    assert.ok(!!model);
  });

  testRelationship('workflow', {key: 'versions', kind: 'hasMany', type: 'workflow-version'});

  test('it computes latest version', function(assert) {
    let workflow = run(() => this.owner.lookup('service:store').createRecord('workflow'));
    run(() => {
      this.owner.lookup('service:store').createRecord('workflow-version', {
        version: 1,
        workflow:workflow,
        enableUi: true,
      });
    });
    assert.equal(workflow.get('latestVersion').get('version'), 1);
    assert.equal(workflow.get('versions').get('length'), 1);

    // create a second version that is also enabled for the UI
    run(() => {
      this.owner.lookup('service:store').createRecord('workflow-version', {
        version: 2,
        workflow:workflow,
        enableUi: true,
      });
    });
    assert.equal(workflow.get('latestVersion').get('version'), 2);
    assert.equal(workflow.get('versions').get('length'), 2);
  });
});
