import Ember from 'ember';

const JobDetailRow = Ember.Component.extend({
  tagName: 'tr',
  classNames: ['job-detail-row'],
  actions: {
    delete() {
      this.get('job').destroyRecord();
    }
  },
  modalConfirmationTitle: Ember.computed('job.id', function() {
    return `Are you sure you want to delete job ${this.get('job.id')}?`;
  }),
  modalConfirmationBody: Ember.computed('job.name', function() {
    return `Your Bespin job '${this.get('job.name')}' will be deleted permanently. This action cannot be undone.`
  }),
  elapsedTime: Ember.computed.alias('job.usage.vmHours')
});

JobDetailRow.reopenClass({
  positionalParams: ['job']
});

export default JobDetailRow;
