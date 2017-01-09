import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.set('router', Ember.getOwner(this).lookup('router:main'));
  }
});
