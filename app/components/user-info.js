import Ember from 'ember';

const UserInfo = Ember.Component.extend({
  tagName: 'span',
  user: null
});

UserInfo.reopenClass({
  positionalParams: ['user']
});

export default UserInfo;
