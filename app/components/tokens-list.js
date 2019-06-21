import Component from '@ember/component';

const TokensList = Component.extend({
  tagName: 'table',
  classNames: ['table','table-striped'],
  tokens: null,
  onDeleteToken: null, /* function(token) called to delete the passed token */
});

TokensList.reopenClass({
  positionalParams: ['tokens']
});

export default TokensList;
