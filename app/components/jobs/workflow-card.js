import Component from '@ember/component';

export default Component.extend({
  workflow: null,
  onPicked: (/*workflow*/) => {},
  actions: {
    pick() {
      const workflow = this.get('workflow');
      const onPicked = this.get('onPicked');
      onPicked(workflow);
    },
  }
});
