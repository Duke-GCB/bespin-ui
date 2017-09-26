import Ember from 'ember';

const JobDetailBody = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-detail-body'],
  job: null
});

JobDetailBody.reopenClass({
  positionalParams: ['job']
});

export default JobDetailBody;
