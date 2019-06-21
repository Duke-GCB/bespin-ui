import Component from '@ember/component';

const TokenDetailRow = Component.extend({
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
