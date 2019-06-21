import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').query('job-questionnaire', {
      workflow_version: params.workflow_version_id
    });
  },
});
