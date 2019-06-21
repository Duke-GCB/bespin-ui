import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | job summary', function(hooks) {
  setupTest(hooks);

  test('it computes workflowTitle', function(assert) {
    const job = EmberObject.create({
      workflowVersion: EmberObject.create({
        version: 3,
        workflow: EmberObject.create({
          name: 'My Workflow'
        })
      })
    });
    let jobSummary = this.owner.factoryFor('component:job-summary').create({job: job});
    assert.equal(jobSummary.get('workflowTitle'), 'My Workflow - Version 3');
    job.set('workflowVersion.version', 7);
    assert.equal(jobSummary.get('workflowTitle'), 'My Workflow - Version 7');
    job.set('workflowVersion.workflow.name', 'Your Workflow');
    assert.equal(jobSummary.get('workflowTitle'), 'Your Workflow - Version 7');
  });
});
