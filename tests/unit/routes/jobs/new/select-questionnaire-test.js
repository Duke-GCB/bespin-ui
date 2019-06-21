import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | jobs/new/select-questionnaire', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:jobs/new/select-questionnaire');
    assert.ok(route);
  });

  test('it sets model to job-questionnaires queried by workflow_version_id', function(assert) {
    let route = this.owner.factoryFor('route:jobs/new/select-questionnaire').create({
      store: {
        query(recordModel, params) {
          return [EmberObject.create({id: 3, kind: 'query_' + recordModel, params: params})];
        }
      }
    });
    let model = route.model({workflow_version_id: 5});
    assert.equal(model.length, 1);
    assert.equal(model[0].get('kind'), 'query_job-questionnaire');
    assert.equal(model[0].get('id'), 3);
    assert.deepEqual(model[0].get('params'), {workflow_version: 5});
  });
});
