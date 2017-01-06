import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.set('router', this.get('container').lookup('router:main'));
  }
});
