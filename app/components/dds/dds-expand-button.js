import Ember from 'ember';

const DDSExpandButton = Ember.Component.extend({
  expanded: false,
  tagName: 'span',
  classNames: ['glyphicon','dds-expand-button'],
  classNameBindings: ['expanded:glyphicon-folder-open:glyphicon-folder-close'],
  click() {
    this.sendAction();
  }
});

DDSExpandButton.reopenClass({
  positionalParams: ['expanded']
});

export default DDSExpandButton;
