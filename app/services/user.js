import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser() {
    return this.get('store').queryRecord('user', {});
  }
});
