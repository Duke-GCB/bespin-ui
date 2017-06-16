import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:json-object', 'Unit | Transform | json object', {
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
  let serialized = transform.serialize({foo:[1,2,3]});
  assert.equal(serialized, JSON.stringify({foo:[1,2,3]}));
});

test('it deserializes from JSON', function(assert) {
  let transform = this.subject();
  let deserialized = transform.deserialize(JSON.stringify({foo:[1,2,3]}));
  assert.deepEqual(deserialized, {foo:[1,2,3]});
});

test('it defaults to an empty object', function(assert) {
  let transform = this.subject();
  let deserialized = transform.deserialize();
  assert.deepEqual(deserialized, {});
  let serialized = transform.serialize();
  assert.equal(serialized, '{}');
});
