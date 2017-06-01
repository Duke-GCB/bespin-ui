import Ember from 'ember';

const DDSResourceNode = Ember.Component.extend({
  resource: null,
  expanded: false,
  selectedResources: null,
  tagName: 'span',
  classNames: ['dds-resource-node'],
  classNameBindings: ['isSelected'],
  isSelected: Ember.computed('resource','selectedResources.[]', function() {
    let selectedResources = this.get('selectedResources');
    if(selectedResources == null) {
      return false;
    }
    let resource = this.get('resource');
    Ember.Logger.log(Ember.inspect(selectedResources));
    return selectedResources.includes(resource);
  }),
  click() {
    this.sendAction();
  }
});

DDSResourceNode.reopenClass({
  positionalParams: ['resource', 'expanded', 'selectedResources']
});

export default DDSResourceNode;
