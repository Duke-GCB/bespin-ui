import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('job-summary', 'Unit | Component | job summary', {
  unit: true
});

test('it computes workflowTitle', function(assert) {
  const job = EmberObject.create({
    workflowVersion: EmberObject.create({
      version: 3,
      workflow: EmberObject.create({
        name: 'My Workflow'
      })
    })
  });
  let jobSummary = this.subject({job: job});
  assert.equal(jobSummary.get('workflowTitle'), 'My Workflow - Version 3');
  job.set('workflowVersion.version', 7);
  assert.equal(jobSummary.get('workflowTitle'), 'My Workflow - Version 7');
  job.set('workflowVersion.workflow.name', 'Your Workflow');
  assert.equal(jobSummary.get('workflowTitle'), 'Your Workflow - Version 7');
});
