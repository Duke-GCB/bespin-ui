import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('route:workflows/index', 'Unit | Route | workflows', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to all active workflows', function(assert) {
  let route = this.subject({
    store: {
      findAll(recordModel) {
        return {
          then(filterFunc) {
            return filterFunc([
              Ember.Object.create({id: 1, kind: 'find_' + recordModel, isActive: true}),
              Ember.Object.create({id: 2, kind: 'find_' + recordModel, isActive: false}),
            ])
          }
        };
      }
    }
  });
  let model = route.model();
  assert.equal(model.length, 1);
  assert.equal(model[0].get('kind'), 'find_workflow');
  assert.equal(model[0].get('id'), 1);
});
