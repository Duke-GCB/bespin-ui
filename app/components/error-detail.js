import Component from '@ember/component';

const ErrorDetail = Component.extend({
  tagName: 'dl',
  classNames: ['error-detail', 'dl-horizontal'],
  error: null
});

ErrorDetail.reopenClass({
  positionalParams: ['error']
});

export default ErrorDetail;
