import Ember from 'ember';

export default Ember.Component.extend({
  workflow: null,
  onPicked: (/*workflow*/) => {},
  workflowVersion: Ember.computed('workflow.latestEnabledVersion', 'workflow.latestVersion', function () {
    let latestEnabledVersion = this.get('workflow.latestEnabledVersion');
    if (latestEnabledVersion) {
      return latestEnabledVersion;
    }
    return this.get('workflow.latestVersion');
  }),
  actions: {
    pick() {
      const workflow = this.get('workflow');
      const onPicked = this.get('onPicked');
      onPicked(workflow);
    },
  }
});
