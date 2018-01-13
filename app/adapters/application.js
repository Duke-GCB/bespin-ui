import DRFAdapter 'drf-ember-frontend/adapters/drf-adapter';
import ENV from 'bespin-ui/config/environment'; // This is how we load config variables from our environment.js file

export default DRFAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.API_URL,
  namespace: ENV.APP.API_NAMESPACE,
});
