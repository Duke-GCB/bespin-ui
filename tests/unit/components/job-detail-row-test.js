import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('job-detail-row', 'Unit | Component | job detail row', {
  // Specify the other units that are required for this test
  needs: ['component:job-detail-row', 'helper:decode-job-state'],
  unit: true
});

test('it computes modalConfimrationTitle from job id', function(assert) {
  const jobDetailRow = this.subject({job: {id: 47}});
  assert.equal(jobDetailRow.get('modalConfirmationTitle'), 'Are you sure you want to delete job 47?');
});

test('it computes modalConfirmationBody from job name', function(assert) {
  const jobDetailRow = this.subject({job: {name: 'Wind up'}});
  assert.equal(jobDetailRow.get('modalConfirmationBody'), "Your Bespin job 'Wind up' will be deleted permanently. This action cannot be undone.");
});

test('it computes elapsedTime from job usage vm_hours', function(assert) {
  const jobDetailRow = this.subject({
    job: {
      usage: {
        vmHours: '12.3'
      }
    }
  });
  assert.equal(jobDetailRow.get('elapsedTime'), "12.3");
});
