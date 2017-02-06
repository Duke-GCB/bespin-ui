import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  job: null,
  jobErrors: [],
  prettyJobOrder: Ember.computed('job.jobOrder', function() {
    try {
      return JSON.stringify(JSON.parse(this.get('job.jobOrder')), undefined, 2);
    } catch(e)  { // May not be valid JSON
      return this.get('job.jobOrder');
    }
  })
});

JobDetail.reopenClass({
  positionalParams: ['job', 'jobErrors']
});

export default JobDetail;
