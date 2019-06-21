import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('job', params.job_id).then(
      (job) => job.get('outputProject')
    );
  }
});
