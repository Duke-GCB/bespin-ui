import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  job: null,
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
