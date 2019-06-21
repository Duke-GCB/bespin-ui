import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

import { run } from '@ember/runloop';

module('Unit | Model | workflow version tool detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('workflow-version-tool-detail'));
    // let store = this.store();
    assert.ok(!!model);
  });

  testRelationship('workflow-version-tool-detail', {key: 'workflowVersion', kind: 'belongsTo', type: 'workflow-version'});
});
