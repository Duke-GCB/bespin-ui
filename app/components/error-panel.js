import Component from '@ember/component';

export default Component.extend({
  errors: null,
  init() {
    this._super(...arguments);
    this.errors = this.errors || [];
  }
});
