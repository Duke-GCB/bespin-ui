import Ember from 'ember';

/*
  This service is now only used when creating dds-job-input-files, and is problematic because
  it does not set the primaryCredential property right away. Ember objects that inject this service
   won't trigger init() until after they try to use the service itself. Ideally the single credential itself
   would be a promise or otherwise more reliable.
 */

export default Ember.Service.extend({
  store: Ember.inject.service(),
  primaryCredential: null,
  init() {
    this._super(...arguments);
    this.get('store').findAll('dds-user-credential').then(credentials => {
      this.set('primaryCredential', credentials.get('firstObject'));
    });
  }
});
