import ActiveWorkflowsRoute from '../active-workflows';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ActiveWorkflowsRoute.extend(AuthenticatedRouteMixin, { // Marks this as authenticated
});
