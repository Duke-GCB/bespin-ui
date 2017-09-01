import Ember from 'ember';

export default Ember.Component.extend({
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
