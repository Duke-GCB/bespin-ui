import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Ember.Route.extend(ApplicationRouteMixin, {
  user: Ember.inject.service(),
  setupController(controller, model) {
   this._super(controller, model);
   controller.set('currentUser', this.get('user').currentUser());
  }
});
