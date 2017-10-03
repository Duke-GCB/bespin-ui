import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, { // Marks this as authenticated
  model(){
    return this.get('store').findAll('workflow').then(
      workflows => workflows.sortBy('name')
    );
  }
});
