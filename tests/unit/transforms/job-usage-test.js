import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | job usage', function(hooks) {
  setupTest(hooks);

  test('it serializes job usage info', function(assert) {
    let transform = this.owner.lookup('transform:job-usage');
    const result = transform.serialize({
      vmHours: 1.1,
      cpuHours: 4.4,
    });
    assert.deepEqual(result, {
      vm_hours: 1.1,
      cpu_hours: 4.4,
    });
  });

  test('it deserializes job usage info', function(assert) {
    let transform = this.owner.lookup('transform:job-usage');
    const result = transform.deserialize({
      vm_hours: 1.1,
      cpu_hours: 4.4,
    });
    assert.deepEqual(result, {
      vmHours: 1.1,
      cpuHours: 4.4,
    });
  });
});
