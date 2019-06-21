import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | json object', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:json-object');
    assert.ok(transform);
  });

  test('it serializes to JSON ', function(assert) {
    let transform = this.owner.lookup('transform:json-object');
    let serialized = transform.serialize({foo:[1,2,3]});
    assert.equal(serialized, JSON.stringify({foo:[1,2,3]}));
  });

  test('it deserializes from JSON', function(assert) {
    let transform = this.owner.lookup('transform:json-object');
    let deserialized = transform.deserialize(JSON.stringify({foo:[1,2,3]}));
    assert.deepEqual(deserialized, {foo:[1,2,3]});
  });

  test('it defaults to an empty object', function(assert) {
    let transform = this.owner.lookup('transform:json-object');
    let deserialized = transform.deserialize();
    assert.deepEqual(deserialized, {});
    let serialized = transform.serialize();
    assert.equal(serialized, '{}');
  });
});
