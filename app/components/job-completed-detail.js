import Component from '@ember/component';

const JobCompletedDetail = Component.extend({
  tagName: 'div',
  classNames: ['job-completed-detail'],
  shareGroup: null,
  email: null
});

JobCompletedDetail.reopenClass({
  positionalParams: ['shareGroup', 'email']
});

export default JobCompletedDetail;

