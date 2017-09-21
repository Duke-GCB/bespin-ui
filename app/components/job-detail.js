import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-detail'],
  job: null,
  showAuthorize: Ember.computed('job.hasAuthorization', 'job.isAuthorized', function() {
    // Only show the authorize control if the job needsAuthorization or is in the just-authorized state
    return !this.get('job.hasAuthorization') || this.get('job.isAuthorized');
  })
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
