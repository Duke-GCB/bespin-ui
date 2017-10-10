import Ember from 'ember';

export default Ember.Service.extend({
  user: null,
  currentUser() {
    return Ember.RSVP.resolve(this.get('user'));
  }
});
