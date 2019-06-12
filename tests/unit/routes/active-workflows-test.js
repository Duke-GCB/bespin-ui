import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('route:active-workflows', 'Unit | Route | active workflows', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to all active workflows sorted by name', function(assert) {
  let route = this.subject({
    store: {
      findAll(recordModel) {
        return {
          then(filterFunc) {
            return filterFunc([
              Ember.Object.create({id: 1, kind: 'find_' + recordModel, isActive: true, 'name': 'Zeta'}),
              Ember.Object.create({id: 2, kind: 'find_' + recordModel, isActive: false}),
              Ember.Object.create({id: 3, kind: 'find_' + recordModel, isActive: true, 'name': 'Alpha'}),
            ])
          }
        };
      }
    }
  });
  let model = route.model();
  assert.equal(model.length, 2);
  assert.equal(model[0].get('kind'), 'find_workflow');
  assert.equal(model[0].get('id'), 3);
  assert.equal(model[0].get('name'), 'Alpha');
  assert.equal(model[1].get('kind'), 'find_workflow');
  assert.equal(model[1].get('id'), 1);
  assert.equal(model[1].get('name'), 'Zeta');
});
