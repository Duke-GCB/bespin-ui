import Ember from 'ember';

const DDSResourceTree = Ember.Component.extend({
  expanded: false,
  onPick: () => {},
  store: Ember.inject.service('store'),
  fetchedOnce: false,
  fetchChildren() {
    if(this.get('resource.isFile')) {
      // Don't do anything if a file
      return;
    }
    this.get('store').query('dds-resource', {
      folder_id: this.get('resource.id')
    }).then((children) => {
      this.set('children', children);
      this.set('fetchedOnce', true);
    });
  },
  didToggleExpanded: Ember.observer('expanded', function() {
    Ember.Logger.log('toggled expanded');
    if(!this.get('fetchedOnce')) {
      this.fetchChildren();
    }
  }),
  actions: {
    expand(){
      this.set('expanded', !this.get('expanded'));
    },
    pick() {
      this.get('onPick')(this.get('resource'));
    }
  }
});

DDSResourceTree.reopenClass({
  positionalParams: ['resource', 'onPick']
});

export default DDSResourceTree;
