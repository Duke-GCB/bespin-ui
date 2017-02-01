import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  job: null,
  jobErrors: [],
  prettyJobOrder: Ember.computed('job.jobOrder', function() {
    return JSON.stringify(JSON.parse(this.get('job.jobOrder')), undefined, 2);
  })
});

JobDetail.reopenClass({
  positionalParams: ['job', 'jobErrors']
});

export default JobDetail;
