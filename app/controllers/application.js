import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service('session'),
  user: service('user'),
  currentUser: null,
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },

  authenticatedDidChange: on('init',
    observer('session.isAuthenticated', function() {
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
