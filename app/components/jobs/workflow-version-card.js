import Component from '@ember/component';

export default Component.extend({
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
