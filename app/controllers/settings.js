import { not } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  showGenerateTokenButton: not('model.tokens.firstObject'),
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
