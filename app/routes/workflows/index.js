import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, { // Marks this as authenticated
  model(){
    return this.get('store').findAll('workflow').then(
      workflows => workflows.sortBy('name')
    );
  }
});
