import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser() {
    return this.get('store').findRecord('user', 'current-user');
  }
});
