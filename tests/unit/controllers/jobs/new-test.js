import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:jobs/new', 'Unit | Controller | jobs/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  beforeEach: function() {
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

test('it handles clear actions', function(assert) {
  let controller = this.subject();

  // questionnaire
  controller.set('questionnaire_id', 64);
  assert.ok(controller.get('questionnaire'));
  controller.send('clearQuestionnaire');
  assert.notOk(controller.get('questionnaire'), 'clearQuestionnaire action should clear questionnaire');

  // Since questionnaire depends on workflowVersion, clearing the workflow version should clear questionnaire
  controller.set('workflow_version_id', 256);
  controller.set('questionnaire_id', 64);
  assert.ok(controller.get('questionnaire'));
  assert.ok(controller.get('workflowVersion'));
  controller.send('clearWorkflowVersion');
  assert.notOk(controller.get('workflowVersion'), 'clearWorkflowVersion action should clear workflowVersion');
  assert.notOk(controller.get('questionnaire'), 'clearWorkflowVersion action should also clear questionnaire');

});
