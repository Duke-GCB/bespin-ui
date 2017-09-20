import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-detail','row'],
  job: null
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
