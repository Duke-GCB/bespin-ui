import Component from '@ember/component';

const DDSExpandButton = Component.extend({
  expanded: false,
  tagName: 'span',
  classNames: ['glyphicon','dds-expand-button','dds-button'],
  classNameBindings: ['expanded:glyphicon-folder-open:glyphicon-folder-close']
});

DDSExpandButton.reopenClass({
  positionalParams: ['expanded']
});

export default DDSExpandButton;
