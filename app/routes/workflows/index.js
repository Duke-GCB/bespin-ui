import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActiveWorkflowsModelMixin from 'bespin-ui/mixins/active-workflows-model';

export default Ember.Route.extend(AuthenticatedRouteMixin, ActiveWorkflowsModelMixin, {
});
