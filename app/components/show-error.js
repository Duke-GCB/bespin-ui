import Ember from 'ember';

const ShowError = Ember.Component.extend({
  tagName: 'dl',
  classNames: ['dl-horizontal'],
  error: null
});

ShowError.reopenClass({
  positionalParams: ['error']
});

export default ShowError;
