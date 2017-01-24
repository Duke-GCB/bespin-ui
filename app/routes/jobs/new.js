import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('job-answer-set');
  },
  setupController(controller, model) {
    this._super(controller, model);
    // Here we set workflows to all the workflows in the store
    controller.set('workflows', this.get('store').findAll('workflow'));
  }
});
