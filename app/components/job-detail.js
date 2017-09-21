import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-detail'],
  job: null
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
