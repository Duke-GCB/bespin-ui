import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('workflow-version', params.workflow_version_id)
  },
});
