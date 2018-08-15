import Ember from 'ember';

const TokenDetailRow = Ember.Component.extend({
  tagName: 'tr',
  token: null,
  onDeleteToken: null, /* function(token) called to delete the passed token */
  actions: {
    deleteToken(token) {
      this.get('onDeleteToken')(token);
    }
  }
});

TokenDetailRow.reopenClass({
  positionalParams: ['token']
});

export default TokenDetailRow;
