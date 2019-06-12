import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActiveWorkflowsMixin from 'bespin-ui/mixins/active-workflows';

export default Ember.Route.extend(AuthenticatedRouteMixin, ActiveWorkflowsMixin, {
});
