import DRFAdapter from './drf';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'; // This is what causes the authorizer to be picked up

export default DRFAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:drf-token-authorizer'
});
