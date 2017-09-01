import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let params = this.paramsFor('workflows.versions');
    return this.get('store').query('workflow-version', {
      workflow: params.workflow_id
    });
  }
});
