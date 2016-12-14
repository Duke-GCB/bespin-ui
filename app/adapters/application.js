import DS from 'ember-data';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'; // This is what causes the authorizer to be picked up
import ENV from 'bespin-ui/config/environment'; // This is how we load config variables from our environment.js file

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  /*
    This adapter is customized for bespin-api running Django REST Framework
   */
  authorizer: 'authorizer:drf-token-authorizer', // Adds token authorization to requests
  host: ENV.APP.API_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  buildURL(modelName, id, snapshot, requestType, query) {
    var url = this._super(modelName, id, snapshot, requestType, query);
    // Enforce trailing slashes
    if (url.charAt(url.length - 1) !== '/') {
      url += '/';
    }
    return url;
  },
  /**
   * pathForType returns the path on the API server for the given model type
   * We override it here because Ember's default is to camelcase and pluralize
   * @param type
   */
  pathForType(type) {
    var dasherized = Ember.String.dasherize(type);
    return Ember.String.pluralize(dasherized);
  }
});
