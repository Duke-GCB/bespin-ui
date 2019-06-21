import Component from '@ember/component';

const DDSRemoveButton = Component.extend({
  resource: null,
  tagName: 'span',
  classNames: ['glyphicon','dds-remove-button', 'glyphicon-remove', 'small', 'dds-button']
});

DDSRemoveButton.reopenClass({
  positionalParams: ['resource', 'selectedResources']
});

export default DDSRemoveButton;
