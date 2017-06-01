import Ember from 'ember';

const DDSResourceNode = Ember.Component.extend({
  resource: null,
  expanded: false,
  pickedResources: null,
  tagName: 'span',
  classNames: ['dds-resource-node'],
  click() {
    this.sendAction();
  },
  init() {
    this.set('pickedResources', []);
    this._super(...arguments);
  }

});

DDSResourceNode.reopenClass({
  positionalParams: ['resource', 'expanded', 'pickedResources']
});

export default DDSResourceNode;
