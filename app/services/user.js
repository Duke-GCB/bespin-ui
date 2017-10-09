import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser() {
    // Use queryRecord since we don't know the id ahead of time
    return this.get('store').queryRecord('user', {});
  }
});
