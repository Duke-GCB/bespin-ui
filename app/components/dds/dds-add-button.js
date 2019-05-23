import Component from '@ember/component';

const DDSAddButton = Component.extend({
  resource: null,
  tagName: 'span',
  classNames: ['glyphicon','dds-add-button', 'glyphicon-file', 'dds-button'],
  click() {
    this.sendAction();
  }
});

DDSAddButton.reopenClass({
  positionalParams: ['resource']
});

export default DDSAddButton;
