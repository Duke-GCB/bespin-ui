import Ember from 'ember';

const ErrorDetail = Ember.Component.extend({
  tagName: 'dl',
  classNames: ['dl-horizontal'],
  error: null
});

ErrorDetail.reopenClass({
  positionalParams: ['error']
});

export default ErrorDetail;
