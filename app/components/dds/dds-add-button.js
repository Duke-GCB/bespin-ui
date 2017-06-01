import Ember from 'ember';

const DDSAddButton = Ember.Component.extend({
  resource: null,
  tagName: 'span'
});

DDSAddButton.reopenClass({
  positionalParams: ['resource']
});

export default DDSAddButton;
