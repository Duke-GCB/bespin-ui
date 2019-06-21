import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | jobs/new/select workflow', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:jobs/new/select-workflow');
    assert.ok(route);
  });

  test('it sets model to all workflows', function(assert) {
    let route = this.owner.factoryFor('route:jobs/new/select-workflow').create({
      store: {
        findAll(recordModel) {
          return [EmberObject.create({id: 1, kind: 'find_' + recordModel})];
        }
      }
    });
    let model = route.model();
    assert.equal(model.length, 1);
    assert.equal(model[0].get('kind'), 'find_workflow');
    assert.equal(model[0].get('id'), 1);
  });
});
