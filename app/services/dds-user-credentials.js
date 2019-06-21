import { resolve } from 'rsvp';
import Service, { inject as service } from '@ember/service';

/*
  This service is now only used when creating dds-job-input-files, and is problematic because
  it does not set the primaryCredential property right away. Ember objects that inject this service
   won't trigger init() until after they try to use the service itself. Ideally the single credential itself
   would be a promise or otherwise more reliable.
 */

export default Service.extend({
  store: service(),
  primaryCredential() {
    return this.get('store').findAll('dds-user-credential').then(credentials => {
      return resolve(credentials.get('firstObject'));
    });
  }
});
