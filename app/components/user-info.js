import Ember from 'ember';

const UserInfo = Ember.Component.extend({
  user: Ember.inject.service(),
  tagName: 'span',
  currentUser: null,

  // Per https://emberigniter.com/render-promise-before-it-resolves/
  didInsertElement() {
    this._super(...arguments);
    this.get('user').currentUser().then(currentUser => {
      this.set('currentUser', currentUser );
    });
  }
});

export default UserInfo;
