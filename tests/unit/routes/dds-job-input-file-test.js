import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dds job input file', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dds-job-input-file');
    assert.ok(route);
  });
});
