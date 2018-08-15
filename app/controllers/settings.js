import Ember from 'ember';

export default Ember.Controller.extend({
  token: Ember.computed('model.tokens.firstObject', function () {
    // each user only has (at most) one token so we filter to that token
    return this.get('model.tokens.firstObject');
  }),
  showGenerateTokenButton: Ember.computed.not('token'),
  actions: {
    generateToken() {
      this.get('store')
        .createRecord('token')
        .save();
    },
    deleteToken(token) {
      token.deleteRecord();
      token.save();
    }
  }
});
