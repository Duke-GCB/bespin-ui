import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActiveWorkflowsMixin from 'bespin-ui/mixins/active-workflows';

export default Route.extend(AuthenticatedRouteMixin, ActiveWorkflowsMixin, {
});
