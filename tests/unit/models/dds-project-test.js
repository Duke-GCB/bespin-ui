import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    // Not much to test in project model yet
    let model = run(() => this.owner.lookup('service:store').createRecord('dds-project'));
    // let store = this.store();
    assert.ok(!!model);
  });
});
