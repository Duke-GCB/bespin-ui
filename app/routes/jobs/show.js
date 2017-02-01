import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      job: this.get('store').findRecord('job', params.job_id),
      errors: this.get('store').query('job-error', {job: params.job_id})
    });
  }
});
