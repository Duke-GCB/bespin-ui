import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('job');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('pickedFiles', []);
    controller.set('router', Ember.getOwner(controller).lookup('router:main'));

    // controller.set('router', Ember.getOwner(controller).lookup('router:main'));
  }
});
