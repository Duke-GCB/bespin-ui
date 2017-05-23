import Ember from 'ember';
import ENV from 'bespin-ui/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  isDevelopmentMode: ENV.environment === 'development',
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification','password');
      // This may need to change
      this.get('session').authenticate('authenticator:drf-token-authenticator', identification, password).catch((reason) => {
        this.set('errorMessage', reason);
      });
    }
  }
});
