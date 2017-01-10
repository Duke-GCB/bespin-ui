import Ember from 'ember';

const DDSFileCheckbox = Ember.Component.extend({
  resource: null,
  pickedResources: [],
  tagName: 'span',
  picked: Ember.computed('pickedResources.[]','resource', function() {
    const pickedResources = this.get('pickedResources');
    const resource = this.get('resource');
    return pickedResources.contains(resource);
  })
});

DDSFileCheckbox.reopenClass({
  positionalParams: ['resource','pickedResources']
});

export default DDSFileCheckbox;
