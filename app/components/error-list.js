import Ember from 'ember';

const ErrorList = Ember.Component.extend({
  classNames: ['error-list'],
  message: null,
  errors: null
});

ErrorList.reopenClass({
  positionalParams: ['errors', 'message']
});

export default ErrorList;
