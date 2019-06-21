import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';

moduleForModel('workflow', 'Unit | Model | workflow', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version', 'model:job', 'model:job-questionnaire', 'model:workflow-methods-document']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testRelationship('workflow', {key: 'versions', kind: 'hasMany', type: 'workflow-version'});

test('it computes latest version', function(assert) {
  let workflow = this.subject();
  run(() => {
    this.store().createRecord('workflow-version', {
      version: 1,
      workflow:workflow,
      enableUi: true,
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 1);
  assert.equal(workflow.get('versions').get('length'), 1);

  // create a second version that is also enabled for the UI
  run(() => {
    this.store().createRecord('workflow-version', {
      version: 2,
      workflow:workflow,
      enableUi: true,
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 2);
  assert.equal(workflow.get('versions').get('length'), 2);
});

test('it computes isActive based on state "A"', function(assert) {
  let workflow = this.subject({ state: 'A'});
  assert.equal(workflow.get('isActive'), true);
});

test('it computes isActive based on state "D"', function(assert) {
  let workflow = this.subject({ state: 'D'});
  assert.equal(workflow.get('isActive'), false);
});

test('it computes isActive based on state null', function(assert) {
  let workflow = this.subject({ state: null});
  assert.equal(workflow.get('isActive'), false);
});
