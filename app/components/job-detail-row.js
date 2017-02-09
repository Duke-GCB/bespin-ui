import Ember from 'ember';

const JobDetailRow = Ember.Component.extend({
  tagName: 'tr',
  classNames: ['job-detail-row']
});

JobDetailRow.reopenClass({
  positionalParams: ['job']
});

export default JobDetailRow;
