import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Serializer | job file stage group', function(hooks) {
  setupTest(hooks);

  test('it serializes records', function(assert) {
    let record = run(
      () => this.owner.lookup('service:store').createRecord('job-file-stage-group', {ddsFiles:[], urlFiles:[]})
    );
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
  });
});
