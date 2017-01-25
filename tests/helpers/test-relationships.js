import Ember from 'ember';
import { test } from 'ember-qunit';

function testRelationship(rel, modelName) {
  test(`it has relationship: ${rel.kind} ${rel.type}`, function(assert) {
    const Model = this.store().modelFor(modelName);
    const relationship = Ember.get(Model, 'relationshipsByName').get(rel.key);
    assert.equal(relationship.key, rel.key, `has relationship with ${rel.type}`);
    assert.equal(relationship.kind, rel.kind, `kind of relationship is ${rel.kind}`);
    assert.equal(relationship.type, rel.type, `Type of related object is ${rel.type}`);
  });
}

function testRelationships(modelName, relationships) {
  for (let rel of relationships) {
    testRelationship(rel, modelName);
  }
}

export default testRelationships;

