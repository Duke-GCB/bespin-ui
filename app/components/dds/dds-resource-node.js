import { computed } from '@ember/object';
import Component from '@ember/component';

const DDSResourceNode = Component.extend({
  resource: null,
  expanded: false,
  selectedResources: null,
  disableIfSelected: true, // Set to false to allow this file to be clicked even if already selected
  tagName: 'span',
  classNames: ['dds-resource-node'],
  classNameBindings: ['isDisabled'],
  isDisabled: computed('isSelected', 'disableIfSelected', function () {
    return this.get('disableIfSelected') && this.get('isSelected');
  }),
  isSelected: computed('resource','selectedResources.[]', function() {
    let selectedResources = this.get('selectedResources');
    if(selectedResources == null) {
      return false;
    }
    let resource = this.get('resource');
    return selectedResources.includes(resource);
  }),
  click() {
    let disabled = this.get('isDisabled');
    if(!disabled) {
      this.sendAction();
    }
  }
});

DDSResourceNode.reopenClass({
  positionalParams: ['resource', 'expanded', 'selectedResources']
});

export default DDSResourceNode;
