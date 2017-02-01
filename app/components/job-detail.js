import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  job: null,
  jobErrors: []
});

JobDetail.reopenClass({
  positionalParams: ['job', 'jobErrors']
});

export default JobDetail;
