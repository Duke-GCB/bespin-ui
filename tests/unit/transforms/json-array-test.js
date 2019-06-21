import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | json array', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:json-array');
    assert.ok(transform);
  });

  test('it serializes to JSON ', function(assert) {
    let transform = this.owner.lookup('transform:json-array');
    let serialized = transform.serialize([1,2,3]);
    assert.equal(serialized, JSON.stringify([1,2,3]));
  });

  test('it deserializes from JSON', function(assert) {
    let transform = this.owner.lookup('transform:json-array');
    let deserialized = transform.deserialize(JSON.stringify([1,2,3]));
    assert.deepEqual(deserialized, [1,2,3]);
  });

  test('it defaults to an empty object', function(assert) {
    let transform = this.owner.lookup('transform:json-array');
    let deserialized = transform.deserialize();
    assert.deepEqual(deserialized, []);
    let serialized = transform.serialize();
    assert.equal(serialized, '[]');
  });
});
