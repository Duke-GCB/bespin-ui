import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:jobs/new/select-workflow', 'Unit | Route | jobs/new/select workflow', {
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to all workflows', function(assert) {
  let route = this.subject({
    store: {
      findAll(recordModel) {
        return [Ember.Object.create({id: 1, kind: 'find_' + recordModel})];
      }
    }
  });
  let model = route.model();
  assert.equal(model.length, 1);
  assert.equal(model[0].get('kind'), 'find_workflow');
  assert.equal(model[0].get('id'), 1);
});
