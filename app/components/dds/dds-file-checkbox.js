import Ember from 'ember';

const DDSFileCheckbox = Ember.Component.extend({
  resource: null,
  pickedFiles: [],
  tagName: 'span',
  picked: Ember.computed('pickedFiles.[]','resource', function() {
    const pickedFiles = this.get('pickedFiles');
    const resource = this.get('resource');
    return pickedFiles.includes(resource);
  })
});

DDSFileCheckbox.reopenClass({
  positionalParams: ['resource','pickedFiles']
});

export default DDSFileCheckbox;
