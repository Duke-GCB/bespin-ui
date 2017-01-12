import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('workflow');
  },
  setupController(controller, model) {
    // by default this sets the model property of the controller to the model
    this._super(controller, model);
    const parentModel = this.modelFor('jobs/new');
    controller.set('job', parentModel);
  }
});
