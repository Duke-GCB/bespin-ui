import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('job-answer-set');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('workflows', this.get('store').findAll('workflow'));
  }
});
