import Ember from 'ember';

const JobCompletedDetail = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-completed-detail'],
  shareGroup: null,
  email: null
});

JobCompletedDetail.reopenClass({
  positionalParams: ['shareGroup', 'email']
});

export default JobCompletedDetail;

