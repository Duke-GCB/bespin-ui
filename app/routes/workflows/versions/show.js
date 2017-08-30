import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('workflow-version', params.workflow_version_id)
  },
});
