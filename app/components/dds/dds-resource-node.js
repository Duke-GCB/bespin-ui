import Ember from 'ember';

const DDSResourceNode = Ember.Component.extend({
  resource: null,
  expanded: false,
  pickedResources: [],
  tagName: 'span',
  classNames: ['dds-resource-node'],
  click() {
    this.sendAction();
  }
});

DDSResourceNode.reopenClass({
  positionalParams: ['resource', 'expanded', 'pickedResources']
});

export default DDSResourceNode;
