import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | job detail row', function(hooks) {
  setupTest(hooks);

  test('it computes modalConfimrationTitle from job id', function(assert) {
    const jobDetailRow = this.owner.factoryFor('component:job-detail-row').create({job: {id: 47}});
    assert.equal(jobDetailRow.get('modalConfirmationTitle'), 'Are you sure you want to delete job 47?');
  });

  test('it computes modalConfirmationBody from job name', function(assert) {
    const jobDetailRow = this.owner.factoryFor('component:job-detail-row').create({job: {name: 'Wind up'}});
    assert.equal(jobDetailRow.get('modalConfirmationBody'), "Your Bespin job 'Wind up' will be deleted permanently. This action cannot be undone.");
  });

  test('it computes elapsedTime from job usage vm_hours', function(assert) {
    const jobDetailRow = this.owner.factoryFor('component:job-detail-row').create({
      job: {
        usage: {
          vmHours: '12.3'
        }
      }
    });
    assert.equal(jobDetailRow.get('elapsedTime'), "12.3");
  });
});
