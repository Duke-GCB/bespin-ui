import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:json-array', 'Unit | Transform | json array', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let transform = this.subject();
  assert.ok(transform);
});

test('it serializes to JSON ', function(assert) {
  let transform = this.subject();
  let serialized = transform.serialize([1,2,3]);
  assert.equal(serialized, JSON.stringify([1,2,3]));
});

test('it deserializes from JSON', function(assert) {
  let transform = this.subject();
  let deserialized = transform.deserialize(JSON.stringify([1,2,3]));
  assert.deepEqual(deserialized, [1,2,3]);
});

test('it defaults to an empty object', function(assert) {
  let transform = this.subject();
  let deserialized = transform.deserialize();
  assert.deepEqual(deserialized, []);
  let serialized = transform.serialize();
  assert.equal(serialized, '[]');
});
