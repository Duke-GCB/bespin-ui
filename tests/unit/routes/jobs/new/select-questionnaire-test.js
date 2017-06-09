import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:jobs/new/select-questionnaire', 'Unit | Route | jobs/new/select-questionnaire', {
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to job-questionnaires queried by workflow_version_id', function(assert) {
  let route = this.subject({
    store: {
      query(recordModel, params) {
        return [Ember.Object.create({id: 3, kind: 'query_' + recordModel, params: params})];
      }
    }
  });
  let model = route.model({workflow_version_id: 5});
  assert.equal(model.length, 1);
  assert.equal(model[0].get('kind'), 'query_job-questionnaire');
  assert.equal(model[0].get('id'), 3);
  assert.deepEqual(model[0].get('params'), {workflow_version: 5});
});
