import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
import Ember from 'ember';

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
  Ember.run(() => {
    this.store().createRecord('workflow-version', {
      version: 1,
      workflow:workflow
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 1);
  assert.equal(workflow.get('versions').get('length'), 1);
  Ember.run(() => {
    this.store().createRecord('workflow-version', {
      version: 2,
      workflow:workflow
    });
  });
  assert.equal(workflow.get('latestVersion').get('version'), 2);
  assert.equal(workflow.get('versions').get('length'), 2);
});
