import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let params = this.paramsFor('workflows.versions');
    return this.get('store').query('workflow-version', {
      workflow: params.workflow_id
    });
  }
});
