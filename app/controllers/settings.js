import Ember from 'ember';

export default Ember.Controller.extend({
  showGenerateTokenButton: Ember.computed.not('model.tokens.firstObject'),
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
