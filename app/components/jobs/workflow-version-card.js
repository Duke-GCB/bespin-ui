import Ember from 'ember';

export default Ember.Component.extend({
  workflowVersion: null,
  onPicked: null,
  actions: {
    pick() {
      const onPicked = this.get('onPicked');
      const workflowVersion = this.get('workflowVersion');
      onPicked(workflowVersion);
    }
  }
});
