import Ember from 'ember';

const DDSRemoveButton = Ember.Component.extend({
  resource: null,
  tagName: 'span',
  classNames: ['glyphicon','dds-remove-button', 'glyphicon-remove', 'small', 'dds-button'],
  click() {
    this.sendAction();
  }
});

DDSRemoveButton.reopenClass({
  positionalParams: ['resource', 'selectedResources']
});

export default DDSRemoveButton;
