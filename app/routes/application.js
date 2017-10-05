import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Ember.Route.extend(ApplicationRouteMixin, {
  setupController(controller, model) {
   this._super(controller, model);
    this.get('store').findRecord('user', 'current-user').then(function(currentUser) {
      controller.set('currentUser', currentUser);
    });
  }
});
