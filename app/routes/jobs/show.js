import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('job', params.job_id);
  },
  setupController(controller, job) {
    /*
      Previously model() returned a hash, to fetch the job and jobErrors together.

      However, this is not compatible with typical {{link-to}} behavior. link-to takes the model object (job)
      as an argument, generates a URL from its ID, and then uses that object as the model when clicking on
      the link. So it doesn't call our model() hook, nor does it pass a hash of {job, errors} as the hook did.

      So it's more consistent for the job to be the single, primary model on this route, and load the errors after
      the model is fulfilled.
     */
    this._super(controller, job);
    // Fetch the job errors
    this.get('store').query('job-error', {
      job: job.get('id')
    }).then((jobErrors) => {
      controller.set('jobErrors', jobErrors);
    });
  }
});
