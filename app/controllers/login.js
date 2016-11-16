import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification','password');
      // This may need to change
      this.get('session').authenticate('authenticator:drf-token-authenticator', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
