import Ember from 'ember';

const TokenDetailRow = Ember.Component.extend({
  tagName: 'tr',
  token: null,
  onDeleteToken: null, /* function(token) run when user clicks Delete */
  actions: {
    deleteToken() {
      this.get('onDeleteToken')(this.get('token'));
    }
  }
});

TokenDetailRow.reopenClass({
  positionalParams: ['token']
});

export default TokenDetailRow;
