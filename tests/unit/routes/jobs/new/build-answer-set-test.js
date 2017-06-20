import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:jobs/new/build-answer-set', 'Unit | Route | jobs/new/build answer set', {
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to a job-answer-set created with a supplied questionnaire', function(assert) {
  let route = this.subject({
    store: {
      findRecord(recordModel, id) {
        return Ember.RSVP.resolve(Ember.Object.create({id: id, kind: 'find_' + recordModel}));
      },
      createRecord(recordModel, params) {
        return Ember.RSVP.resolve(Ember.Object.create({kind: 'create_' + recordModel, params: params}));
      }
    }
  });

  Ember.run(() => {
    route.model({questionnaire_id: 7}).then(model => {
      assert.equal(model.get('kind'), 'create_job-answer-set');
      let questionnaire = model.get('params.questionnaire');
      assert.deepEqual(questionnaire, Ember.Object.create({id: 7, kind: 'find_job-questionnaire'}));
    });
    route.model({questionnaire_id: 32}).then(model => {
      assert.equal(model.get('kind'), 'create_job-answer-set');
      let questionnaire = model.get('params.questionnaire');
      assert.deepEqual(questionnaire, Ember.Object.create({id:32, kind: 'find_job-questionnaire'}));
    });
  });
});
