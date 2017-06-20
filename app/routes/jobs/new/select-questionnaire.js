import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').query('job-questionnaire', {
      workflow_version: params.workflow_version_id
    });
  },
});
