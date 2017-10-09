import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  user: Ember.inject.service('user'),
  currentUser: null,
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },

  authenticatedDidChange: Ember.on('init',
    Ember.observer('session.isAuthenticated', function() {
      if (this.get('session.isAuthenticated')) {
        this.get('user').currentUser().then(currentUser => {
          this.set('currentUser', currentUser);
        });
      } else {
        this.set('currentUser', null);
      }
    })
  )

});
