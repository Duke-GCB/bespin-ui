import Ember from 'ember';

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
