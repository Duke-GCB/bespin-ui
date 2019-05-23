import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

const JobDetailRow = Component.extend({
  tagName: 'tr',
  classNames: ['job-detail-row'],
  actions: {
    delete() {
      this.get('job').destroyRecord();
    }
  },
  modalConfirmationTitle: computed('job.id', function() {
    return `Are you sure you want to delete job ${this.get('job.id')}?`;
  }),
  modalConfirmationBody: computed('job.name', function() {
    return `Your Bespin job '${this.get('job.name')}' will be deleted permanently. This action cannot be undone.`
  }),
  elapsedTime: alias('job.usage.vmHours')
});

JobDetailRow.reopenClass({
  positionalParams: ['job']
});

export default JobDetailRow;
