import Component from '@ember/component';

const UserInfo = Component.extend({
  tagName: 'span',
  user: null
});

UserInfo.reopenClass({
  positionalParams: ['user']
});

export default UserInfo;
