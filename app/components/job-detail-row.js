import Ember from 'ember';

const JobDetailRow = Ember.Component.extend({
  tagName: 'tr',
  classNames: ['job-detail-row'],
  actions: {
    delete() {
      this.get('job').destroyRecord();
    }
  }

});

JobDetailRow.reopenClass({
  positionalParams: ['job']
});

export default JobDetailRow;
