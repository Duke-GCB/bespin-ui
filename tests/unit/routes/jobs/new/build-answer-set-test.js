import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | jobs/new/build answer set', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:jobs/new/build-answer-set');
    assert.ok(route);
  });

  test('it sets model to a job-answer-set created with a supplied questionnaire', function(assert) {
    let route = this.owner.factoryFor('route:jobs/new/build-answer-set').create({
      store: {
        findRecord(recordModel, id) {
          return resolve(EmberObject.create({id: id, kind: 'find_' + recordModel}));
        },
        createRecord(recordModel, params) {
          return resolve(EmberObject.create({kind: 'create_' + recordModel, params: params}));
        }
      }
    });

    run(() => {
      route.model({questionnaire_id: 7}).then(model => {
        assert.equal(model.get('kind'), 'create_job-answer-set');
        let questionnaire = model.get('params.questionnaire');
        assert.deepEqual(questionnaire, EmberObject.create({id: 7, kind: 'find_job-questionnaire'}));
      });
      route.model({questionnaire_id: 32}).then(model => {
        assert.equal(model.get('kind'), 'create_job-answer-set');
        let questionnaire = model.get('params.questionnaire');
        assert.deepEqual(questionnaire, EmberObject.create({id:32, kind: 'find_job-questionnaire'}));
      });
    });
  });
});
