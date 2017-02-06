import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  job: null,
  jobErrors: [],
  indent: 2,
  prettyJobOrder: Ember.computed('job.jobOrder', 'indent', function() {
    try {
      return JSON.stringify(JSON.parse(this.get('job.jobOrder')), undefined, this.get('indent'));
    } catch(e)  { // May not be valid JSON
      return this.get('job.jobOrder');
    }
  })
});

JobDetail.reopenClass({
  positionalParams: ['job', 'jobErrors']
});

export default JobDetail;
