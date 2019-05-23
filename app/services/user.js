import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  currentUser() {
    // Use queryRecord since we don't know the id ahead of time
    return this.get('store').queryRecord('user', {});
  }
});
