import Ember from 'ember';

const DDSAddButton = Ember.Component.extend({
  resource: null,
  tagName: 'span',
  classNames: ['glyphicon','dds-add-button', 'glyphicon-file'],
  click() {
    this.sendAction();
  }
});

DDSAddButton.reopenClass({
  positionalParams: ['resource']
});

export default DDSAddButton;
