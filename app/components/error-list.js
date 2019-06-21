import Component from '@ember/component';

const ErrorList = Component.extend({
  classNames: ['error-list'],
  message: null,
  errors: null
});

ErrorList.reopenClass({
  positionalParams: ['errors', 'message']
});

export default ErrorList;
