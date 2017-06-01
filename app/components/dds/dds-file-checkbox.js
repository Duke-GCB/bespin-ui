import Ember from 'ember';

const DDSFileCheckbox = Ember.Component.extend({
  resource: null,
  pickedFiles: null,
  tagName: 'span',
  picked: Ember.computed('pickedFiles.[]','resource', function() {
    const pickedFiles = this.get('pickedFiles');
    const resource = this.get('resource');
    return pickedFiles.includes(resource);
  }),
  init() {
    this.set('pickedFiles', []);
    this._super(...arguments);
  }
});

DDSFileCheckbox.reopenClass({
  positionalParams: ['resource','pickedFiles']
});

export default DDSFileCheckbox;
