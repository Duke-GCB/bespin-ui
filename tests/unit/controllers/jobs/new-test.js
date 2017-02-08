import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

// Stub a questionnaire service
const QuestionnaireStub = Ember.Service.extend({
  makeProxy() {
    return Ember.Object.create({
      name: 'QuestionnaireProxyStub',
      load() {}
    });
  }
});

moduleFor('controller:jobs/new', 'Unit | Controller | jobs/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  beforeEach: function() {
    this.register('service:questionnaire', QuestionnaireStub);
    this.inject.service('questionnaire', {as: 'questionnaire'});

    this.subject({
      store: {
        findRecord(recordModel, recordId) {
          return Ember.Object.create({id: recordId, kind: 'found_' + recordModel});
        },
        query(recordModel, params) {
          return [Ember.Object.create({id: 1, kind: 'queried_' + recordModel, params: params})];
        }
      }
    });
  }
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it updates workflow version on picking workflow', function(assert) {
  let controller = this.subject();
  let workflow = Ember.Object.create({latestVersion: Ember.Object.create({id:3})});
  controller.send('workflowChanged', workflow);
  assert.equal(controller.get('workflow_version_id'), 3);
});

test('it updates questionnaire on picking questionnaire', function(assert) {
  let controller = this.subject();
  let questionnaire = Ember.Object.create(Ember.Object.create({id:7}));
  controller.send('questionnaireChanged', questionnaire);
  assert.equal(controller.get('questionnaire_id'), 7);
});

test('it fetches workflowVersion and questionnaires when id is set', function(assert) {
  let controller = this.subject();
  controller.set('workflow_version_id', 1);
  let computedVersion = controller.get('workflowVersion');
  assert.equal(computedVersion.get('id'), 1);
  assert.equal(computedVersion.get('kind'), 'found_workflowVersion'); // Our stubbed findRecord sets this
  controller.set('workflow_version_id', 3);
  computedVersion = controller.get('workflowVersion');
  assert.equal(computedVersion.get('id'), 3);
  assert.equal(computedVersion.get('kind'), 'found_workflowVersion'); // Our stubbed findRecord sets this
  let computedQuestionnaires = controller.get('questionnaires');
  assert.equal(computedQuestionnaires.length, 1);
  assert.equal(computedQuestionnaires[0].get('kind'), 'queried_job-questionnaire');
});

test('it fetches questionnaire when id is set', function(assert){
  let controller = this.subject();
  controller.set('questionnaire_id', 10);
  let computedQuestionnaire = controller.get('questionnaire');
  assert.equal(computedQuestionnaire.get('id'), 10);
  assert.equal(computedQuestionnaire.get('kind'), 'found_job-questionnaire'); // Our stubbed findRecord sets this
  controller.set('questionnaire_id', 51);
  computedQuestionnaire = controller.get('questionnaire');
  assert.equal(computedQuestionnaire.get('id'), 51);
  assert.equal(computedQuestionnaire.get('kind'), 'found_job-questionnaire'); // Our stubbed findRecord sets this
});

test('it filters questionnaires by workflow version', function(assert) {
  let controller = this.subject();
  controller.set('workflow_version_id', 3);
  let computedQuestionnaires = controller.get('questionnaires');
  assert.equal(computedQuestionnaires[0].get('params.workflow_version'), 3);
  controller.set('workflow_version_id', 7);
  computedQuestionnaires = controller.get('questionnaires');
  assert.equal(computedQuestionnaires[0].get('params.workflow_version'), 7);

});

test('it computes a null questionnaireProxy when no questionnaire_id set', function(assert) {
  let controller = this.subject();
  controller.set('questionnaire_id', null);
  let proxy = controller.get('questionnaireProxy');
  assert.notOk(proxy, 'Should not return a proxy when questionnaire id is null');
});

test('it computes a questionnaireProxy when questionnaire_id is set', function(assert) {
  let controller = this.subject();
  controller.set('questionnaire_id', 64);
  let proxy = controller.get('questionnaireProxy');
  assert.ok(proxy, 'Should return a proxy when questionnaire id is null');
  assert.equal(proxy.get('name'), 'QuestionnaireProxyStub', 'should create a QuestionnaireProxyStub');
});
