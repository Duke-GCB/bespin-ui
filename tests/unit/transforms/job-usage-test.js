import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:job-usage', 'Unit | Transform | job usage', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it serializes job usage info', function(assert) {
  let transform = this.subject();
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
  let transform = this.subject();
  const result = transform.deserialize({
    vm_hours: 1.1,
    cpu_hours: 4.4,
  });
  assert.deepEqual(result, {
    vmHours: 1.1,
    cpuHours: 4.4,
  });
});
