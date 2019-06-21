import Component from '@ember/component';

export default Component.extend({
  onClickNext() {},
  onClickBack() {},
  actions: {
    next() {
      this.get('onClickNext')();
    },
    back() {
      this.get('onClickBack')();
    },
  }
});
