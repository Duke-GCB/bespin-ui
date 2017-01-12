import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(){
    return this.get('store').findAll('dds-project');
  },
  setupController(controller, model) {
    // by default this sets the model property of the controller to the model
    this._super(controller, model);
    const parentModel = this.modelFor('jobs/new');
    controller.set('job', parentModel);
    controller.set('pickedFiles', this.controllerFor('jobs/new').pickedFiles);
  }
});
